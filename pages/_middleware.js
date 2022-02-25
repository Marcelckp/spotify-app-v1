import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
    // token will exist if user is authenticated
    const token = await getToken({ req, secret: process.env.NEXT_JWT_SECRET });
    const { pathname } = req.nextUrl;

    // if token is true or you are being redirected from auth endpoint
    if (pathname.includes('/api/auth') || token) return NextResponse.next();

    // if there is no token and the path name is = to a protected route
    if (!token && pathname !== '/login') return NextResponse.redirect('/login');
}