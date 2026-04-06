import { IconCalendarCheck, IconEmergencyBed, IconHeartbeat, IconLayoutGrid, IconMedicineSyrup, IconNotes, IconStethoscope, IconUser } from '@tabler/icons-react';
import Sidebar from '../../../Pages/Sidebar';

const links = [
  {
    name:"Profile",url:"doctor/profile" ,icon:<IconUser stroke={1.5}/>
  },
  {
    name:"Appointments",url:"doctor/appointments",icon:<IconCalendarCheck stroke={1.5}/>
  },
  {
    name:"Pharmacy",url:"doctor/pharmacy",icon:<IconMedicineSyrup stroke={1.5}/>
  },
  {
    name:"Prescriptions",url:"/doctor/prescriptions",icon:<IconNotes stroke={1.5}/>
  },
  {
    name:"Patients",url:"/doctor/ListOfPatients",icon:<IconEmergencyBed stroke={1.5}/>
  },
]

const DoctorSidebar = () => {
  return <Sidebar links={links} basePath="doctor" />;
};

export default DoctorSidebar;
