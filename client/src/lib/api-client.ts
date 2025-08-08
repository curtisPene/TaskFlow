import Axios, { type InternalAxiosRequestConfig } from "axios";

const authRequestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }

  config.withCredentials = true;
  return config;
};

export const api = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
