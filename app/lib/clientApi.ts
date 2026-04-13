import { LoginFormData, RegisterFormData } from '../types/auth';
import { User } from '../types/user';
import { nextServer } from './api';


export const register = async (data: RegisterFormData) => {
  const res = await nextServer.post<User>('/users/signup', data);
  return res.data;
};


export const login = async (data: LoginFormData) => {
  const res = await nextServer.post<User>('/users/signin', data);
  return res.data;
};

export const getCurrentUser = async () => {
  const res = await nextServer.get<User>('/users/current');
  return res.data;
};

export const logout = async () => {
  const res = await nextServer.post('/users/signout');
  return res.data;
};