import { IconLayoutSidebarLeftCollapseFilled,IconBellRinging, IconLayoutSidebarRightCollapseFilled } from "@tabler/icons-react";
import { ActionIcon, Avatar } from '@mantine/core';
import ProfileMenu from './ProfileMenu';
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../Slices/SidebarSlice";
import NotificationPanel from "../Pages/NotificationPage";
import { useState } from "react";
import { useEffect, useRef } from "react";

const Header = () => {
  const token = useSelector((state: any) => state.jwtSlice);
  const dispatch = useDispatch();
  const isCollapsed = useSelector(
    (state: any) => state.sidebar.isSidebarCollapsed,
  );
  const [showNotifications, setShowNotifications] = useState(false);
  const notifications = useSelector((state: any) => state.notifications ?? []);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`
    relative   // ✅ IMPORTANT for absolute centering
    w-full h-16 px-4 md:px-6
    bg-gradient-to-r from-black via-slate-900 to-emerald-900
    flex items-center justify-between
    border-b border-emerald-500/30
    shadow-lg backdrop-blur-xl sticky top-0 z-30
    ${isCollapsed ? "md:ml-20" : "md:ml-64"}
  `}
    >
      {/* LEFT */}
      <div className="flex items-center gap-3">
        <ActionIcon
          onClick={() => dispatch(toggleSidebar())}
          variant="transparent"
          size="lg"
          className="rounded-full bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-400/40"
        >
          {!isCollapsed ? (
            <IconLayoutSidebarLeftCollapseFilled className="text-emerald-300" />
          ) : (
            <IconLayoutSidebarRightCollapseFilled className="text-emerald-300" />
          )}
        </ActionIcon>

        <span className="text-emerald-50 text-sm">
          {!isCollapsed ? "Collapse" : "Expand"}
        </span>
      </div>

      {/* 🔥 CENTER BRAND */}
      <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none">
        <span className="text-emerald-100 text-lg md:text-xl font-bold tracking-wide">
          I-Care
        </span>
        <div className="text-[10px] text-slate-400">
          Monitor • Manage • Heal
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {token && (
          <div ref={notificationRef} className="relative">
            <ActionIcon
              onClick={() => setShowNotifications((prev) => !prev)}
              variant="transparent"
              size="lg"
              className="relative bg-emerald-500/10 hover:bg-emerald-500/25 border border-emerald-400/40"
            >
              <IconBellRinging className="text-emerald-200" />

              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full shadow-[0_0_6px_rgba(248,113,113,0.9)]" />
              )}
            </ActionIcon>

            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 z-50">
                <NotificationPanel />
              </div>
            )}
          </div>
        )}

        {token && <ProfileMenu />}
      </div>
    </header>
  );
};

export default Header
