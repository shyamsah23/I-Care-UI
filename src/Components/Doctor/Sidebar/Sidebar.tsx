import { ActionIcon, Avatar, Text } from '@mantine/core';
import { IconCalendarCheck, IconEmergencyBed, IconHeartbeat, IconLayoutGrid, IconMedicineSyrup, IconStethoscope, IconUser } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const links = [
  {
    name:"Dashboard",url:"doctor/dashboard",icon:<IconLayoutGrid stroke={1.5}/>
  },
  {
    name:"Profile",url:"doctor/profile" ,icon:<IconUser stroke={1.5}/>
  },
  {
    name:"Appointments",url:"doctor/appointments",icon:<IconCalendarCheck stroke={1.5}/>
  },
  {
    name:"Pharmacy",url:"/pharmacy",icon:<IconMedicineSyrup stroke={1.5}/>
  },
]
const DoctorSidebar = () => {
  const userDetails = useSelector((state: any) => state.userSlice);
  return (
    <aside
      className="
        fixed inset-y-0 left-0
        md:w-64 w-full
        h-screen
        bg-gradient-to-b from-black via-slate-900 to-emerald-900
        text-white
        flex md:flex-col flex-row
        md:items-stretch items-center
        md:justify-start justify-between
        gap-8
        px-5 py-6
        shadow-xl
        z-20
        backdrop-blur-xl
        overflow-y-hidden
      "
    >
      {/* Brand */}
      <div className="flex items-center gap-3 md:justify-start justify-center">
        <ActionIcon
          variant="transparent"
          size="xl"
          aria-label="I-Care"
          className="
            bg-emerald-500/15
            border border-emerald-400/40
            backdrop-blur-md 
            rounded-2xl shadow-lg
            hover:bg-emerald-500/25 hover:shadow-2xl
            transition-all duration-300
          "
        >
          <IconHeartbeat
            stroke={2.2}
            style={{ width: "70%", height: "70%" }}
            className="text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.9)]"
          />
        </ActionIcon>

        <span className="font-heading text-3xl font-semibold tracking-wide text-emerald-100">
          I-Care
        </span>
      </div>

      {/* User section */}
      <div className="flex flex-col items-center gap-3 md:mt-2">
        <div className="p-[4px] bg-white/10 rounded-full shadow-lg backdrop-blur-md border border-emerald-400/40">
          <Avatar
            variant="filled"
            src="../myAvatar.png"
            size={70}
            alt="it's me"
            radius="xl"
            className="shadow-xl"
          />
        </div>
        <span className="font-semibold text-xl text-white">{userDetails?.decoded?.sub}</span>
        <Text c="dimmed" size="xs" className='text-light'>{userDetails?.role}</Text>
      </div>

      {/* Navigation */}
      <nav className="md:mt-6 w-full">
        <ul
          className="
            flex md:flex-col flex-row
            md:gap-3 gap-4
            md:w-full
            justify-center md:justify-start
            md:items-stretch items-center
          "
        >
          {links.map((ele) => (
            <li key={ele.url} className="md:w-full">
              <Link
                to={ele.url}
                className="
                  group
                  flex items-center gap-3
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
                  md:w-full
                "
              >
                <span className="text-emerald-300 group-hover:scale-125 transition-all duration-300">
                  {ele.icon}
                </span>

                <span className="whitespace-nowrap drop-shadow-md">
                  {ele.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default DoctorSidebar;
