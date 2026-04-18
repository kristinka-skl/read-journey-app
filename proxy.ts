import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { refreshServerSession } from './app/lib/serverApi';

const privateRoutes = ['/recommended', '/library', '/reading'];
const publicRoutes = ['/login', '/register'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (!accessToken) {
    if (refreshToken) {
      try {
        const data = await refreshServerSession(refreshToken);
        const newToken = data.data.token;
        const newRefreshToken = data.data.refreshToken;

        if (newToken && newRefreshToken) {
          cookieStore.set('accessToken', newToken);
          cookieStore.set('refreshToken', newRefreshToken);
          if (isPublicRoute) {
            return NextResponse.redirect(new URL('/recommended', request.url), {
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });
          }
          if (isPrivateRoute) {
            return NextResponse.next({
              headers: {
                Authorization: `Bearer ${newToken}`,
              },
            });
          }
        }
      } catch {
        return NextResponse.redirect(new URL('/', request.url), {});
      }
    }
    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (isPrivateRoute) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (isPublicRoute) {
    return NextResponse.redirect(new URL('/recommended', request.url));
  }
  if (isPrivateRoute) {
    return NextResponse.next();
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
