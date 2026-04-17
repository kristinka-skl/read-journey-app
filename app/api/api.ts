import axios, { AxiosError } from 'axios';

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
