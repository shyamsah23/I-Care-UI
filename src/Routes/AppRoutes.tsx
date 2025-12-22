import { createBrowserRouter, Outlet} from 'react-router-dom';
import Error from '../Components/Pages/Error';
import Appointments from '../Components/Pages/Appointments';
import Signup from '../Components/Pages/Signup';
import Login from '../Components/Pages/Login';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import App from '../App';
import PatientDashboard from '../Components/Layout/PatientDashboard';
import DoctorDashboard from '../Components/Layout/DoctorDashboard';
import DoctorProfile from '../Components/Doctor/Profile/Profile';
import PatientProfile from '../Components/Patient/Profile/Profile';
import HomePage from '../Components/Pages/HomePage';
import AdminDashboard from '../Components/Layout/AdminDashboard';
import { Pharmacy } from '../Components/Admin/Pharmacy/Pharmacy';
import PatientProfileForm from '../Components/Patient/Profile/PatientDetailsForm';
import DoctorProfileForm from '../Components/Doctor/Profile/DoctorDetailsForm';
import Inventory from '../Components/Admin/Inventory/Inventory';
import Sales from '../Components/Admin/Sales/Sales';
import { GetAllDoctors_Patients } from '../Components/Admin/GetAllDoctors_Patients';

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "patient/",
        element: <Outlet />,
        children: [
          {
            path: "dashboard",
            element: <PatientDashboard />,
          },
          {
            path: "home",
            element: <HomePage />,
          },
          {
            path: "profile",
            element: <PatientProfile />,
          },
          {
            path: "appointments",
            element: <Appointments />,
          },
        ],
      },
      {
        path: "doctor/",
        element: <Outlet />,
        children: [
          {
            path: "dashboard",
            element: <DoctorDashboard />,
          },
          {
            path: "home",
            element: <HomePage />,
          },
          {
            path: "profile",
            element: <DoctorProfile />,
          },
          {
            path: "appointments",
            element: <Appointments />,
          },
        ],
      },
      {
        path: "admin/",
        element: <Outlet />,
        children: [
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "home",
            element: <HomePage />,
          },
          {
            path: "doctors",
            element: <GetAllDoctors_Patients type="doctor" />,
          },
          {
            path: "patients",
            element: <GetAllDoctors_Patients type="patient" />,
          },
          {
            path: "pharmacy",
            element: <Pharmacy />,
          },
          {
            path: "inventory",
            element: <Inventory />,
          },
          {
            path: "sales",
            element: <Sales />,
          }
        ],
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: `/profile/patient`,
    element: (
      <ProtectedRoute>
        <PatientProfileForm />
      </ProtectedRoute>
    ),
  },
  {
    path: `/profile/doctor`,
    element: (
      <ProtectedRoute>
        <DoctorProfileForm />
      </ProtectedRoute>
    ),
  },
]);

