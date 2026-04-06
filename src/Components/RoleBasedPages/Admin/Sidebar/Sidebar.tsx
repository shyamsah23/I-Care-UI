import { IconBox, IconCalendarCheck, IconEmergencyBed,IconLayoutGrid, IconMedicineSyrup, IconNotes, IconReportMoney, IconStethoscope} from '@tabler/icons-react';
import Sidebar from '../../../Pages/Sidebar';

const links = [
  {
    name:"Patients",url:"admin/patients",icon:<IconEmergencyBed stroke={1.5}/>
  },
  {
    name:"Doctors",url:"admin/doctors",icon:<IconStethoscope stroke={1.5}/>
  },
  {
    name:"Appointments",url:"admin/appointments",icon:<IconCalendarCheck stroke={1.5}/>
  },
  {
    name:"Pharmacy",url:"admin/pharmacy",icon:<IconMedicineSyrup stroke={1.5}/>
  },
  {
    name:"Inventory",url:"admin/inventory",icon:<IconBox stroke={1.5}/>
  },
  {
    name:"Sales",url:"admin/sales",icon:<IconReportMoney stroke={1.5}/>
  },
  {
    name:"Prescriptions",url:"/admin/prescriptions",icon:<IconNotes stroke={1.5}/>
  }
]

const AdminSidebar = () => {
  return <Sidebar links={links} basePath="admin" />;
};

export default AdminSidebar;
