import { useSelector} from "react-redux";
import { Navigate } from "react-router-dom";

interface PublicRouteProps{
  children: JSX.Element
}


const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const token = useSelector((state: any) => state.jwtSlice);
  const user = useSelector((state: any) => state.userSlice);
  const role = user?.decoded?.role?.toLowerCase?.() || "";
  const path = `/profile/${role}`;

  if ((token)) {
    if (user) {
      if (role == "admin") return <Navigate to={"/admin/dashboard"}/>
      else return <Navigate to={path} />
    }
    else return children;
  }
  return children;
}

export default PublicRoute;