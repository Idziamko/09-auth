import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
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

      const setCookie = sessionResult.headers['set-cookie'];
      if (setCookie) {
        const response = NextResponse.next();
        const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
        for (const cookieStr of cookieArray) {
          const parsed = parse(cookieStr);

          const options: {
            expires?: Date;
            path?: string;
            maxAge?: number;
          } = {
            expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
            path: parsed.Path,
            maxAge: Number(parsed['Max-Age']),
          };

          if (parsed.accessToken) {
            response.cookies.set('accessToken', parsed.accessToken, options);
          }
          if (parsed.refreshToken) {
            response.cookies.set('refreshToken', parsed.refreshToken, options);
          }
        }
        return response;
      }
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
