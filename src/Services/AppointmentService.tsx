import axiosInstance from "../Interceptor/AxiosInterceptor";

const getTodayAppointmentByDoctorId = (doctorId: number , token: String) =>  {
    console.log("getTodayAppointmentByDoctorId called")
    const today = new Date().toISOString().split("T")[0];
    const dummyDateForTesting = "2025-10-28";


    return axiosInstance.get(`appointment/details`, {
       params: {
        doctorId: doctorId,
        date: dummyDateForTesting
       },
       headers: {
        Authorization: `Bearer ${token}`,
       }
        
        
    }).then((response: any) => response.data)
    .catch((error: any)=> {
        throw error;
    });
};

export default getTodayAppointmentByDoctorId;