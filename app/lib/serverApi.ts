import { nextServer } from './api';

export const refreshServerSession = async (refreshToken: string) => {
  const res = await nextServer.get('/users/current/refresh', {
    headers: {
      Cookie: `refreshToken=${refreshToken}`,
    },
  });
  return res;
};
