import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { api } from '@/app/api/api';


export async function GET() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token available' }, { status: 401 });
    }

    const apiRes = await api.get('/users/current/refresh', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    });

    const data = apiRes.data; 

    const cookieOptions = {
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      path: '/', 
    };

    if (data.token) {
      cookieStore.set('accessToken', data.token, { ...cookieOptions, maxAge: 60 * 60 });
    }
    if (data.refreshToken) {
      cookieStore.set('refreshToken', data.refreshToken, { ...cookieOptions, maxAge: 30 * 24 * 60 * 60 });
    }

    return NextResponse.json(data);

  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message ?? error.response?.data?.error ?? error.message;
      const statusCode = error.response?.status || 500;
      return NextResponse.json({ error: errorMessage }, { status: statusCode });
    } 
    console.error("Unknown error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}