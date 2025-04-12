import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, getUserById } from '@/lib/db';

export async function middleware(request: NextRequest) {
  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/blog',
    '/api/auth/login',
    '/login',
  ];

  // Check if the path is public
  const path = request.nextUrl.pathname;
  const isPublicPath = publicPaths.some(publicPath => 
    path === publicPath || path.startsWith('/blog/')
  );

  if (isPublicPath) {
    return NextResponse.next();
  }

  // Get the token from cookies
  const token = request.cookies.get('auth-token')?.value;

  // If no token is present, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Verify the token
  const decoded = verifyToken(token);
  if (!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Get the user from the database
  const user = await getUserById(decoded.userId as string);
  if (!user) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // User is authenticated, proceed
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    '/create/:path*',
    '/dashboard/:path*',
    '/api/posts/:path*',
    '/api/auth/me',
  ],
};
