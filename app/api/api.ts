import axios, { AxiosError, isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { refreshServerSession } from '../lib/serverApi';

export type ApiError = AxiosError<{ 
  error?: string; 
  message?: string;
  response?: {
    message: string;
  };
}>;

export const api = axios.create({
  baseURL: 'https://readjourney.b.goit.study/api/',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._isRetry) {
      originalRequest._isRetry = true;

      try {
        const cookieStore = await cookies();
        const refreshToken = cookieStore.get('refreshToken')?.value;
        if (!refreshToken) throw Error('no refresh token');
        const res = await refreshServerSession(refreshToken);
        if (res.data.token && res.data.refreshToken) {
          cookieStore.set("accessToken", res.data.token);
          cookieStore.set("refreshToken", res.data.refreshToken);
          originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        if (isAxiosError(refreshError)) return refreshError.response;
        throw refreshError;
      }
    }

    return error.response;
  }
);
