import { NextResponse } from "next/server"
import { withAuth } from "next-auth/middleware"
// export const config = { pages: {signIn: '/login'}, secret: "x0NCOOymWv+aFes8G00rGFbQEP3wSselAN7qjWdtNBw=" }

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
      if ((new URL(req.url)).pathname === '/') {
        return NextResponse.redirect(new URL('/main', req.url));
      }
    },
);
