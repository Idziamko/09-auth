import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { checkSession } from '@/lib/api/serverApi';

const privateRoutes = ['/profile', '/notes'];
const authRoutes = ['/sign-in', '/sign-up'];

export default async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  let hasValidSession = !!accessToken;

  if (!accessToken && refreshToken) {
    const sessionResult = await checkSession();
    if (sessionResult) {
      hasValidSession = true;
    }
  }

  if (isPrivateRoute && !hasValidSession) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isAuthRoute && hasValidSession) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};
