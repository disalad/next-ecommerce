import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { authConfig } from './auth.config';
import { DEFAULT_REDIRECT, PUBLIC_ROUTES, PRIVATE_ROUTES } from '@/lib/routes';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
    const { nextUrl } = req;
    const pathname = nextUrl.pathname;

    const isAuthenticated = !!req.auth;
    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
    const isPrivate = PRIVATE_ROUTES.some((route) =>
        pathname.startsWith(route)
    );

    // Redirect to default page if user is authenticated and tries to access public route
    if (isPublicRoute && isAuthenticated)
        return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl));

    // Send unauthorized error if user is not authenticated and tries to access private route
    if (isPrivate && !isAuthenticated)
        return new NextResponse(
            JSON.stringify({ error: 'Unauthorized, please log in' }),
            {
                status: 401,
                headers: { 'Content-Type': 'application/json' },
            }
        );
});

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
