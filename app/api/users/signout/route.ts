import { NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { api } from '../../api';


export async function POST() {
  const cookieStore = await cookies();
  
  try {
    const token = cookieStore.get('accessToken')?.value;

    if (token) {     
      await api.post('/users/signout', {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    return NextResponse.json({ message: 'Signed out successfully' });

  } catch (error: unknown) {
    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');

    if (isAxiosError(error)) {
      const errorMessage = error.response?.data?.message ?? error.response?.data?.error ?? error.message;
      const statusCode = error.response?.status || 500;
      return NextResponse.json({ error: errorMessage }, { status: statusCode });
    } 
    console.error("Unknown error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}