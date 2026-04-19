import { NextRequest, NextResponse } from 'next/server';
import { isAxiosError } from 'axios';
import { cookies } from 'next/headers';
import { api } from '../../api';

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const apiRes = await api.post('/users/signin', body);
    const data = apiRes.data;
    const cookieStore = await cookies();

    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
    };

    if (data.token) {
      cookieStore.set('accessToken', data.token, {
        ...cookieOptions,
        maxAge: 60 * 60,
      });
    }

    if (data.refreshToken) {
      cookieStore.set('refreshToken', data.refreshToken, {
        ...cookieOptions,
        maxAge: 30 * 24 * 60 * 60,
      });
    }

    return NextResponse.json({
      name: data.name,
      email: data.email,
    });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error(
        'Registration error:',
        error.response?.data || error.message
      );

      const errorMessage =
        error.response?.data?.message ??
        error.response?.data?.error ??
        error.message;

      const statusCode = error.response?.status || 500;

      return NextResponse.json({ error: errorMessage }, { status: statusCode });
    }

    console.error('Unknown error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
