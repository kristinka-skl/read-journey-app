import axios from "axios";

export const nextServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
});

nextServer.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true; 

      try {
        await nextServer.get('/users/current/refresh');        
        return nextServer(originalRequest);

      } catch (refreshError) {
        window.location.href = '/login';        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);