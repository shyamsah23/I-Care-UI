import { Menu, Text, Avatar } from "@mantine/core";
import {
  IconUser,
  IconCalendarCheck,
  IconNotes,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUserDetails } from "../../Slices/UserSlice";
import { deleteJWTToken } from "../../Slices/AuthSlice";

const ProfileMenu = () => {
  const userDetails = useSelector((state: any) => state.userSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const role = userDetails?.decoded?.role?.toLowerCase();

  const handleLogout = () => {
    dispatch(removeUserDetails());
    dispatch(deleteJWTToken());
    navigate("/login");
  };

  return (
    <Menu
      shadow="md"
      width={230}
      position="bottom-end"
      transitionProps={{ transition: "pop", duration: 150 }}
      classNames={{
        dropdown:
          "bg-slate-900 text-slate-100 border border-emerald-500/40 shadow-xl",
        label: "text-emerald-300 font-semibold",
        item: "hover:bg-emerald-600/30 hover:text-emerald-50",
        divider: "border-slate-700",
      }}
    >
      {/* Trigger */}
      <Menu.Target>
        <div className="flex items-center gap-3 cursor-pointer">
          <span className="font-medium text-lg text-emerald-50">
            {userDetails?.decoded?.sub}
          </span>

          <div className="p-1 bg-emerald-500/20 rounded-full border border-emerald-400/60">
            <Avatar src="../myAvatar.png" size={35} radius="xl" />
          </div>
        </div>
      </Menu.Target>

      {/* Dropdown */}
      <Menu.Dropdown>
        <Menu.Label>Account</Menu.Label>

        <Menu.Item
          leftSection={<IconUser size={14} />}
          onClick={() => navigate(`/${role}/profile`)}
        >
          My Profile
        </Menu.Item>

        <Menu.Item
          leftSection={<IconCalendarCheck size={14} />}
          onClick={() => navigate(`/${role}/appointments`)}
        >
          Appointments
        </Menu.Item>

        {/* Show only for patient/doctor */}
        {(role === "patient" || role === "doctor") && (
          <Menu.Item
            leftSection={<IconNotes size={14} />}
            onClick={() => navigate(`/${role}/prescriptions`)}
          >
            Prescriptions
          </Menu.Item>
        )}

        <Menu.Divider />

        <Menu.Item
          leftSection={<IconSettings size={14} />}
          onClick={() => navigate(`/${role}/settings`)}
        >
          Settings
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item
          color="red"
          leftSection={<IconLogout size={14} />}
          onClick={handleLogout}
          className="hover:bg-red-600/40 hover:text-red-50"
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileMenu;
