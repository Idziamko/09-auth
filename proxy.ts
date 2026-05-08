import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export default function proxy(request: NextRequest) {
  const hasAuthCookie = request.cookies.has('accessToken') || request.cookies.has('refreshToken');

  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  if (isPrivateRoute && !hasAuthCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthRoute && hasAuthCookie) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
