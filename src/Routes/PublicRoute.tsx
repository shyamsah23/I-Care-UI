import { jwtDecode } from "jwt-decode";
import { useSelector} from "react-redux";
import { Navigate } from "react-router-dom";
import { getProfileData } from "../Services/ProfileService";
import { useState } from "react";

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
      return <Navigate to={path} />
    }
    else return children;
  }
  return children;
}

export default PublicRoute;