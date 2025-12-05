import axiosInstance from "../Interceptor/AxiosInterceptor";

const loginUser = async (user: any) => {
  return axiosInstance
    .post("/auth/user/login", user)
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export default loginUser;
