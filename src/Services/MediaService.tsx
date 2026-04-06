import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getMediaById = async (token:any, id:any) => {
  return axiosInstance.get(`/media/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob",
  });
};

export const addMedia = async (token: any, file:any) => {
  return axiosInstance
    .post("/media/upload", file, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export const getAllMedia = async (token: any) => {
  return axiosInstance
    .get(`/media/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export const createPrescription = async (token: any, formData: any) => {
  try {
    return await axiosInstance.post(
      "/media/prescriptions/create",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("CREATE PRESCRIPTION ERROR:", error);
    throw error;
  }
};

export const getAllPrescriptions = async (token:any) => {
  return axiosInstance
    .get(`/media/prescriptions/getAll`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export const getPrescriptionsFromDoctor = async (token:any, doctorId:number) => {
  return axiosInstance
    .get(`/media/prescriptions/getByDoctorId/${doctorId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export const getPrescriptionsForPatient = async (token:any, patientId:number) => {
  return axiosInstance
    .get(`/media/prescriptions/getByPatientId/${patientId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

