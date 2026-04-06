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

export const forgotPassword = async (email: string) => {
  return axiosInstance.post("/auth/user/forgot-password", {
    email: email,
  });
}

export const resetPassword = async (token:any,password:any) => {
  axiosInstance.post(
    `/auth/user/reset-password?token=${token}`,
    password,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    },
  );
};
export default loginUser;
