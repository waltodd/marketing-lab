// middleware.ts
import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

const PUBLIC_ROUTES = ['/signin', '/signup', '/code', '/'];
const secretKey = process.env.JWT_SECRET || 'your-secret-key';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow access to public routes
  if (PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  // Get the token from cookies for protected routes
  const token = req.cookies.get('accessToken')?.value;

  // console.log(`In Middleware${token}`)

  // If no token is found, redirect to the signin page
  if (!token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }
}

// Apply middleware only to specific routes (e.g., /dashboard and /profile)
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
