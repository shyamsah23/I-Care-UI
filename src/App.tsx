import './App.css'
import Header from './Components/Header/Header'
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import PatientSidebar from './Components/Patient/Sidebar/Sidebar';
import DoctorSidebar from './Components/Doctor/Sidebar/Sidebar';
import AdminSidebar from './Components/Admin/Sidebar/Sidebar';

const App = () => {
  const token = useSelector((state: any) => state.jwtSlice);
  const user = jwtDecode(token)?.role;
  // console.log(user);
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