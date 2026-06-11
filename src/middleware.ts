import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const adminSession = request.cookies.get('wicare_admin_session')?.value;
    const correctPassword = process.env.ADMIN_PASSWORD;

    // If there is no cookie or it doesn't match the password, redirect to home
    if (!adminSession || !correctPassword || adminSession !== correctPassword) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
