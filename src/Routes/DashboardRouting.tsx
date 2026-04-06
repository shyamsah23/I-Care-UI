import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

const RoleRedirect = () => {
  const token = useSelector((state: any) => state.jwtSlice);

  if (!token) return <Navigate to="/login" />;

  const role = jwtDecode(token)?.role;

  if (role === "ADMIN") return <Navigate to="/admin" />;
  if (role === "DOCTOR") return <Navigate to="/doctor" />;
  return <Navigate to="/patient" />;
};

export default RoleRedirect;
