import { ActionIcon, Avatar, Text } from "@mantine/core";
import { IconHeartbeat } from "@tabler/icons-react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

type LinkItem = {
  name: string;
  url: string;
  icon: JSX.Element;
};

interface Props {
  links: LinkItem[];
  basePath: string;
}

const Sidebar = ({ links, basePath }: Props) => {
  const navigate = useNavigate();
  const userDetails = useSelector((state: any) => state.userSlice);
  const isCollapsed = useSelector(
    (state: any) => state.sidebar.isSidebarCollapsed,
  );

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50
        ${isCollapsed ? "md:w-20" : "md:w-64"}
        w-64
        md:translate-x-0
        h-screen
        bg-gradient-to-b from-black via-slate-900 to-emerald-900
        text-white
        flex flex-col
        items-center
        gap-6
        px-3 py-6
        shadow-xl
        backdrop-blur-xl
        transition-all duration-300
        overflow-y-auto
      `}
    >
      {/* 🔥 BRAND */}
      <div className="flex items-center gap-3">
        <ActionIcon
          variant="transparent"
          size="xl"
          className="
            bg-emerald-500/15
            border border-emerald-400/40
            rounded-2xl shadow-lg
            hover:bg-emerald-500/25 hover:shadow-2xl
            transition-all duration-300
          "
        >
          <IconHeartbeat className="text-emerald-300" />
        </ActionIcon>

        {!isCollapsed && (
          <span
            className="text-3xl font-semibold text-emerald-100 tracking-wide cursor-pointer"
            onClick={() => navigate(`/${basePath}`)}
          >
            I-Care
          </span>
        )}
      </div>

      {/* 🔥 USER */}
      <div className="flex flex-col items-center gap-3">
        <div className="p-[4px] bg-white/10 rounded-full border border-emerald-400/40 shadow-lg cursor-pointer">
          <Avatar
            src="../myAvatar.png"
            size={isCollapsed ? 45 : 70}
            radius="xl"
            onClick={() => navigate(`/${basePath}/profile`)}
          />
        </div>

        {!isCollapsed && (
          <>
            <span className="font-semibold text-lg">
              {userDetails?.decoded?.sub}
            </span>
            <Text size="xs" c="dimmed">
              {userDetails?.decoded?.role}
            </Text>
          </>
        )}
      </div>

      {/* 🔥 NAV */}
      <nav className="w-full mt-4">
        <ul className="flex flex-col gap-3 w-full">
          {links.map((ele) => (
            <li key={ele.url}>
              <Link
                to={ele.url}
                className={`
                  group
                  flex items-center
                  ${isCollapsed ? "justify-center" : "gap-3"}
                  px-4 py-3
                  rounded-xl
                  text-sm md:text-base
                  font-medium
                  bg-white/5
                  hover:bg-emerald-500/20
                  text-emerald-50
                  backdrop-blur-md
                  shadow-md hover:shadow-xl
                  border border-white/10 hover:border-emerald-400/60
                  transition-all duration-300
                  ${isCollapsed ? "mx-auto w-12" : "w-full"}
                `}
              >
                <span className="text-emerald-300 group-hover:scale-125 transition-all duration-300">
                  {ele.icon}
                </span>

                {!isCollapsed && (
                  <span className="whitespace-nowrap drop-shadow-md">
                    {ele.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
