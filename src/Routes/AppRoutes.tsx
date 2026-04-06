import { createBrowserRouter, Outlet} from 'react-router-dom';
import Error from '../Components/Pages/Error';
import Signup from '../Components/Pages/Signup';
import Login from '../Components/Pages/Login';
import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';
import App from '../App';
import PatientDashboard from '../Components/RoleBasedPages/Patient/Dashboard/PatientDashboard';
import DoctorDashboard from '../Components/RoleBasedPages/Doctor/Dashboard/DoctorDashboard';
import DoctorProfile from '../Components/RoleBasedPages/Doctor/Profile/Profile';
import PatientProfile from "../Components/RoleBasedPages/Patient/Profile/Profile";
import HomePage from '../Components/Pages/HomePage';
import AdminDashboard from '../Components/RoleBasedPages/Admin/Dashboard/AdminDashboard';
import { Pharmacy } from "../Components/RoleBasedPages/Admin/Pharmacy/Pharmacy";
import PatientProfileForm from "../Components/RoleBasedPages/Patient/Profile/PatientDetailsForm";
import DoctorProfileForm from "../Components/RoleBasedPages/Doctor/Profile/DoctorDetailsForm";
import Inventory from "../Components/RoleBasedPages/Admin/Inventory/Inventory";
import Sales from "../Components/RoleBasedPages/Admin/Sales/Sales";
import { GetAllDoctors_Patients } from "../Components/RoleBasedPages/Admin/GetAllDoctors_Patients";
import PatientAppointments from "../Components/RoleBasedPages/Patient/AppointmentDetails.tsx/PatientAppointments";
import DoctorAppointments from "../Components/RoleBasedPages/Doctor/AppointmentDetails.tsx/DoctorAppointments";
import AdminAppointments from "../Components/RoleBasedPages/Admin/Appointments/AdminAppointments";
import { DoctorPharmacy } from "../Components/RoleBasedPages/Doctor/Pharmacy/DoctorPharmacy";
import Prescription from '../Components/Pages/Prescription';
import { PatientPharmacy } from "../Components/RoleBasedPages/Patient/Pharmacy/PatientPharmacy";
import { Cart } from '../Components/Pages/Cart';
import { PaymentPage } from '../Components/Pages/PaymentPage';
import ResetPassword from '../Components/Pages/PasswordResetPage';
import ForgotPassword from '../Components/Pages/ForgotPasswordPage';
import RoleRedirect from './DashboardRouting';
import PatientOrderHistory from '../Components/Pages/OrderHistory';

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
        path: "",
        element: <RoleRedirect />,
      },
      {
        path: "patient",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <PatientDashboard />,
          },
          {
            path: "profile",
            element: <PatientProfile />,
          },
          {
            path: "appointments",
            element: <PatientAppointments />,
          },
          {
            path: "prescriptions",
            element: <Prescription role="PATIENT" />,
          },
          {
            path: "listOfDoctors",
            element: <GetAllDoctors_Patients type="doctor" />,
          },
          {
            path: "pharmacy",
            element: <PatientPharmacy />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "payment",
            element: <PaymentPage />,
          },
          {
            path: "order-history",
            element: <PatientOrderHistory />,
          },
        ],
      },
      {
        path: "doctor",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <DoctorDashboard />,
          },
          {
            path: "profile",
            element: <DoctorProfile />,
          },
          {
            path: "pharmacy",
            element: <DoctorPharmacy />,
          },
          {
            path: "appointments",
            element: <DoctorAppointments />,
          },
          {
            path: "prescriptions",
            element: <Prescription role="DOCTOR" />,
          },
          {
            path: "ListOfPatients",
            element: <GetAllDoctors_Patients type="patient" />,
          },
        ],
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <AdminDashboard />,
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
            path: "appointments",
            element: <AdminAppointments />,
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
          },
          {
            path: "prescriptions",
            element: <Prescription role="ADMIN" />,
          },
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
    path: "/reset-password",
    element: (
      <PublicRoute>
        <ResetPassword />
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
    path: "/forgot-password",
    element: (
      <PublicRoute>
        <ForgotPassword />
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

