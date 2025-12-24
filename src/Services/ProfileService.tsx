import axios from "axios";
import axiosInstance from "../Interceptor/AxiosInterceptor";


const updateProfile = async (profile: any, token: string, user:any) => {
  const role = user?.decoded?.role?.toLowerCase?.() || "";
  return axiosInstance
    .put(`/profile/${role}/update`, profile, {
      headers: {
         Authorization: `Bearer ${token}`,
      },
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export const getProfileData = async (id: any, user: any,token:any) => {
  const role = user?.decoded?.role?.toLowerCase?.() || user?.role?.toLowerCase?.();
  console.log("The role is " + role);
  return axiosInstance
    .get(`/profile/${role}/get/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export const getAllDoctors_Patients = async (type: string,token:any) => {
  return axiosInstance
    .get(`/profile/${type}/all-${type}s`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export default updateProfile;
