import axios, { InternalAxiosRequestConfig } from 'axios';
import { config } from 'process';

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080"
})
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log("interceptor", config);
    return config;
  }
)

export default axiosInstance;
