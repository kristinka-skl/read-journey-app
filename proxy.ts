import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from './app/api/api';

const publicRoutes = ['/login', '/register'];

export async function proxy(request: NextRequest) {
  const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route));
  const accessToken = await getAccessToken();
  if (accessToken) {
    if (!isPublicRoute || !await isValidAccessToken(accessToken)) return NextResponse.next();
    return NextResponse.redirect(new URL('/recommended', request.url));
  }
  if (isPublicRoute) return NextResponse.next();
  return NextResponse.redirect(new URL('/login', request.url));
}

async function getAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get('accessToken')?.value;
}

async function isValidAccessToken(accessToken: string) {
  try {
    const res = await api.get('/users/current', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data.token !== undefined;
  } catch {
    return false;
  }
}

export const config = {
  matcher: [
    '/recommended/:path*',
    '/library/:path*',
    '/reading/:path*',
    '/login',
    '/register',
  ],
};
