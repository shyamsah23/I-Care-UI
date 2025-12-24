import axiosInstance from "../Interceptor/AxiosInterceptor";

export const getAllMedicines = async (token: any) => {
  return axiosInstance
    .get("/pharmacy/medicines/getAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export const addMedicine = async (token: any,medicine:any) => {
  return axiosInstance
      .post("/pharmacy/medicines/add", medicine, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response: any) => response.data)
      .catch((error: any) => {
        throw error;
      });
};

export const updateMedicine = async (token: any, medicine: any) => {
  return axiosInstance
    .put("/pharmacy/medicines/update", medicine, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export const addMedicineInInventory = async (token: any, inventory: any) => {
  return axiosInstance
    .post("/pharmacy/inventory/medicines/add", inventory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export const updateMedicineInInventory = async (token: any, inventory: any) => {
  return axiosInstance
    .put("/pharmacy/inventory/medicines/update", inventory, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export const getAllMedicinesInInventory = async (token: any) => {
  return axiosInstance
    .get("/pharmacy/inventory/medicines/getAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export const getAllSalesData = async (token: any) => {
  return axiosInstance
    .get("/pharmacy/sales/getAll", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export const createSales = async (token: any, sales: any) => {
  return axiosInstance
    .post("/pharmacy/sales/create", sales, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export const updateSales = async (token: any, sales: any) => {
  return axiosInstance
    .put("/pharmacy/sales/update", sales, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};

export const getAllSalesItemBySaleId = async (token: any, saleId:number) => {
  return axiosInstance
    .get(`/pharmacy/sales/saleItem/getBySaleId/${saleId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response: any) => response.data)
    .catch((error: any) => {
      throw error;
    });
};