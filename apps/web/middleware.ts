<<<<<<< HEAD
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { neon } from '@neondatabase/serverless';
import { NextResponse } from 'next/server';

async function getUserData(userId: string) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const user = await sql`
      SELECT 
        users.*, 
        roles.roleName, 
        user_roles.role_id
      FROM 
        users
      LEFT JOIN 
        user_roles ON users.id = user_roles.user_id
      LEFT JOIN 
        roles ON user_roles.role_id = roles.id
      WHERE 
        users.clerk_id = ${userId}
      LIMIT 1;
    `;
    return user.length > 0 ? user[0] : null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}
const isProtectedRoute = createRouteMatcher(['/dashboard(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (!auth().userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting

    const userId = auth().userId
    if (!userId) {
      return NextResponse.redirect(new URL('/signin',req.url));
    }
  
    const userData = await getUserData(userId);
    if (!userData) {
      return NextResponse.redirect(new URL('/unauthorized',req.url));
    }
  
    const userRole = userData.roleName;
  
    switch (userRole) {
      case 'admin':
        return NextResponse.redirect(new URL('/dashboard/admin',req.url));
      case 'influencer':
        return NextResponse.redirect(new URL('/dashboard/influencer', req.url));
      case 'sponsor':
        return NextResponse.redirect(new URL('/dashboard/sponsor', req.url));
      default:
        return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    return auth().redirectToSignIn()
  }
})

// Apply middleware to all paths
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
=======
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
>>>>>>> origin/main
};
