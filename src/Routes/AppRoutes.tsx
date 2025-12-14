import { createBrowserRouter, Outlet} from 'react-router-dom';
import Error from '../Components/Pages/Error';
import Appointments from '../Components/Pages/Appointments';
import Pharmacy from '../Components/Pages/Pharmacy';
import Signup from '../Components/Pages/Signup';
import Login from '../Components/Pages/Login';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import App from '../App';
import PatientDashboard from '../Components/Layout/PatientDashboard';
import DoctorDashboard from '../Components/Layout/DoctorDashboard';
import DoctorProfile from '../Components/Doctor/Profile/Profile';
import PatientProfile from '../Components/Patient/Profile/Profile';
import PatientProfileForm from '../Components/Pages/PatientDetailsForm';
import DoctorProfileForm from '../Components/Pages/DoctorDetailsForm';
import PatientAppointment from '../Components/Pages/Patient/PatientAppointment';

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><App /></ProtectedRoute>,
    children: [
      {
        path: "patient/",
        element: <Outlet/>,
        children: [
          {
            path: "dashboard",
            element:<PatientDashboard/>
          },
          {
            path: "profile",
            element:<PatientProfile/>
          },
          {
            path: "appointments",
            element: <PatientAppointment/>
          }
        ]
      },
      {
        path: "doctor/",
        element: <Outlet/>,
        children: [
          {
            path: "dashboard",
            element:<DoctorDashboard/>
          },
          {
            path: "profile",
            element:<DoctorProfile/>
          },
          {
            path: "appointments",
            element:<Appointments/>
          }
        ]
      },
      {
        path: "pharmacy",
        element: <Pharmacy />,
      }
    ],
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <PublicRoute> <Signup /></PublicRoute>,
  },
  {
    path: "/login",
    element: <PublicRoute> <Login/></PublicRoute>,
  },
  {
    path: `/profile/patient`,
    element: <ProtectedRoute><PatientProfileForm/></ProtectedRoute>,
  },
  {
    path: `/profile/doctor`,
    element: <ProtectedRoute><DoctorProfileForm/></ProtectedRoute>,
  }
]);

