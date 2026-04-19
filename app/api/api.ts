import axios, { AxiosError } from 'axios';
import { cookies } from 'next/headers';

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
  response => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status !== 401 || error.request.path === '/api/users/current/refresh' || originalRequest._isRetry) {
      return Promise.reject(error);
    }
    originalRequest._isRetry = true;
    const newAccessToken = await refreshServerSession();
    if (!newAccessToken) {
      return Promise.reject(error);
    }
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    return api(originalRequest);
  }
);

async function refreshServerSession() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;
  if (!refreshToken) return null;
  try {
    const res = await api.get('/users/current/refresh', {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });
    if (res.data.token && res.data.refreshToken) {
      cookieStore.set('accessToken', res.data.token);
      cookieStore.set('refreshToken', res.data.refreshToken);
      return res.data.token;
    }
  } catch {
  }
  return null;
}
