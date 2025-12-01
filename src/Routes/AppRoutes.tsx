import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Dashboard from '../Components/Layout/Dashboard';
import Error from '../Components/Error';
import Appointments from '../Components/Appointments';
import Pharmacy from '../Components/Pharmacy';
import Signup from '../Components/Pages/Signup';
import Login from '../Components/Pages/Login';
import App from '../App';
import Doctor from '../Components/Doctor';
import Patient from '../Components/Patient';


const AppRoutes = () => {

  return (
    <div>
      <div className="">
        <App />
        <main
          className="
          pt-16
          md:ml-64
          p-4 md:p-6
        "
        >
          <Outlet />
        </main>
      </div>
    </div>
  );

}

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppRoutes />,
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "appointments",
        element: <Appointments />,
      },
      {
        path: "pharmacy",
        element: <Pharmacy />,
      },
      {
        path: "doctors",
        element: <Doctor />,
      },
      {
        path: "patients",
        element: <Patient/>,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default AppRoutes;
