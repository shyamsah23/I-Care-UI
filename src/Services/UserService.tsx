import axiosInstance from "../Interceptor/AxiosInterceptor";

const loginUser = async (user: any) => {
  return axiosInstance
    .post("/auth/user/login", user)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export const signupUser = async (user: any) => {
  return axiosInstance
    .post("/auth/user/register", user)
    .then((response) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export default loginUser;
