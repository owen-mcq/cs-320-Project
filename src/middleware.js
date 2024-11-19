import { cookies } from 'next/headers';
import { NextResponse, NextRequest } from 'next/server'

const protectedRoutes= ['/', '/past', '/api'];

export default async function middleware(request) {
    if (protectedRoutes.includes(request.nextUrl.pathname) && (await cookies()).get('session') === undefined) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}