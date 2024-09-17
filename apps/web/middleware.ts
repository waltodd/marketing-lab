import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';


const isProtectedRoute = createRouteMatcher(['/dashboard(.*)']);
async function getUserDataByEmail(userId: string ) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const user = await sql`
      SELECT 
        users.*, 
        roles.role_name, 
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

export default clerkMiddleware(async (auth, req) => {
  const { userId } = auth();

  console.log("MD", userId)

  if (!userId && isProtectedRoute(req)) {
    // If the user is not authenticated and trying to access a protected route
    return NextResponse.redirect(new URL('/signin', req.url))
  }
  const userData = await getUserDataByEmail(userId || '');

  // console.log("DATA", userData.role_name)

  if (userId && isProtectedRoute(req)) {
    // Fetch the user's role from your backend API
    // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${userId}`);
    // const userData = await response.json();
    const userRole =userData?.role_name

    //Redirect users based on their role
    switch (userRole) {
      case 'admin':
        return NextResponse.redirect(new URL('/dashboard/admin', req.url));
      case 'influencer':
        return NextResponse.redirect(new URL('/dashboard/influencer', req.url));
      case 'sponsor':
        return NextResponse.redirect(new URL('/dashboard/sponsor', req.url));
      default:
        return NextResponse.redirect(new URL('/signin', req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
