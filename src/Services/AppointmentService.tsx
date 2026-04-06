import { error } from "console";
import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getTodayAppointmentById = (doctorOrPatientId: number, token: String, type:String) => {
  console.log("getTodayAppointmentByDoctorOrPatientId called");
  const today = new Date().toISOString().split("T")[0];
  const dummyDateForTesting = "2025-10-28";

  return axiosInstance
    .get(`appointment/details`, {
      params: {
        doctorId: doctorOrPatientId,
        date: dummyDateForTesting,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

