import { IconLayoutSidebarLeftCollapseFilled,IconBellRinging } from "@tabler/icons-react";
import { ActionIcon, Avatar } from '@mantine/core';
import ProfileMenu from './ProfileMenu';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

const Header = () => {
  const token = useSelector((state: any) => state.jwtSlice);
  return (
    <header
      className="
      w-full
      h-16
      px-4 md:px-6
      bg-gradient-to-r from-black via-slate-900 to-emerald-900
      flex items-center justify-between
      border-b border-emerald-500/30
      shadow-lg
      backdrop-blur-xl
      sticky top-0 z-30
      md:ml-64
    "
    >
      {/* Left: sidebar toggle / brand */}
      <div className="flex items-center gap-3">
        <ActionIcon
          variant="transparent"
          size="lg"
          aria-label="Toggle sidebar"
          className="
          rounded-full
          bg-emerald-500/10
          hover:bg-emerald-500/25
          shadow-md hover:shadow-xl
          border border-emerald-400/40
          transition-all duration-300
        "
        >
          <IconLayoutSidebarLeftCollapseFilled
            stroke={2}
            style={{ width: "80%", height: "80%" }}
            className="text-emerald-300 drop-shadow-[0_0_10px_rgba(16,185,129,0.9)]"
          />
        </ActionIcon>

        <div className="flex flex-col">
          <span className="font-heading text-lg md:text-xl font-semibold text-emerald-50 tracking-wide">
            I-Care Dashboard
          </span>
          <span className="text-[11px] md:text-xs text-slate-300">
            Monitor • Manage • Heal
          </span>
        </div>
      </div>

      {/* Right: notification + auth buttons + profile */}
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-3">
          {!token && (
            <Link
              to="/login"
              className="
            px-4 py-1.5
            text-sm font-medium
            rounded-lg
            bg-white/10
            border border-emerald-500/40
            text-emerald-100
            hover:bg-emerald-600/20
            transition-all duration-300
            shadow-md hover:shadow-xl
            backdrop-blur-md
          "
            >
              Login
            </Link>
          )}

          {!token && (
            <Link
              to="/signup"
              className="
            px-4 py-1.5
            text-sm font-medium
            rounded-lg
            bg-white/10
            border border-emerald-500/40
            text-emerald-100
            hover:bg-emerald-600/20
            transition-all duration-300
            shadow-md hover:shadow-xl
            backdrop-blur-md
          "
            >
              Signup
            </Link>
          )}
          {token && (
            <ActionIcon
              variant="transparent"
              size="lg"
              aria-label="Notifications"
              className="
          relative
          rounded-full
          bg-emerald-500/10
          hover:bg-emerald-500/25
          shadow-md hover:shadow-xl
          border border-emerald-400/40
          transition-all duration-300
        "
            >
              <IconBellRinging
                stroke={2}
                style={{ width: "80%", height: "80%" }}
                className="text-emerald-200 drop-shadow-[0_0_10px_rgba(45,212,191,0.9)]"
              />
              <span className="absolute top-1 right-1 inline-flex h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(248,113,113,0.9)]" />
            </ActionIcon>
          )}
        </div>

        {/* Profile menu */}
        {token && <ProfileMenu />}
      </div>
    </header>
  );
}

export default Header
