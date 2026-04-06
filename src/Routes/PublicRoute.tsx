import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: JSX.Element;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = useSelector((state: any) => state.jwtSlice);
  const user = useSelector((state: any) => state.userSlice);

  const role = user?.decoded?.role?.toLowerCase() || "";

  if (token && user?.decoded) {
    return <Navigate to={`/${role}`} replace />;
  }
  return children;
};

export default PublicRoute;
