import { IconCalendarCheck, IconHistory,IconMedicineSyrup,IconNotes,IconStethoscope,IconUser } from '@tabler/icons-react';
import Sidebar from '../../../Pages/Sidebar';

const links = [
  {
    name:"Profile",url:"/patient/profile" ,icon:<IconUser stroke={1.5}/>
  },
  {
    name:"Appointments",url:"/patient/appointments",icon:<IconCalendarCheck stroke={1.5}/>
  },
  {
    name:"Doctors",url:"/patient/listOfDoctors",icon:<IconStethoscope stroke={1.5}/>
  },
  {
    name:"Pharmacy",url:"/patient/pharmacy",icon:<IconMedicineSyrup stroke={1.5}/>
  },
  {
    name:"Prescriptions",url:"/patient/prescriptions",icon:<IconNotes stroke={1.5}/>
  },
  {
    name:"Order History",url:"/patient/order-history",icon:<IconHistory stroke={1.5}/>
  },
]
const PatientSidebar = () => {
  return <Sidebar links={links} basePath="patient" />;
};

export default PatientSidebar;
