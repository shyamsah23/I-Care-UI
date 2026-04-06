import Header from './Components/Header/Header'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import PatientSidebar from "./Components/RoleBasedPages/Patient/Sidebar/Sidebar";
import DoctorSidebar from "./Components/RoleBasedPages/Doctor/Sidebar/Sidebar";
import AdminSidebar from "./Components/RoleBasedPages/Admin/Sidebar/Sidebar";
import AdminDashboard from './Components/RoleBasedPages/Admin/Dashboard/AdminDashboard';
import PatientDashboard from './Components/RoleBasedPages/Patient/Dashboard/PatientDashboard';
import DoctorDashboard from './Components/RoleBasedPages/Doctor/Dashboard/DoctorDashboard';

const App = () => {
  const token = useSelector((state: any) => state.jwtSlice);
  const user = jwtDecode(token)?.role;
  return (
    <div>
      <div className="flex">
          {user == 'ADMIN' ? <AdminSidebar /> : user == 'PATIENT'?<PatientSidebar />:<DoctorSidebar/>}   
        <Header />
      </div>
      <main className="pt-16 md:ml-64 p-4 md:p-6"> 
        <Outlet />
      </main>
    </div>
  );
}

export default App

