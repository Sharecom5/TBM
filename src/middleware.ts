import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const hostname = request.headers.get('host') || '';

    // Check if hostname is missing 'www' and not localhost
    // We only apply this to thebharatmirror.com
    if (
        hostname === 'thebharatmirror.com' &&
        process.env.NODE_ENV === 'production'
    ) {
        url.hostname = `www.${hostname}`;
        return NextResponse.redirect(url, 301);
    }

    return NextResponse.next();
}

// Optional: only run middleware on specific paths if performance is a concern
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
