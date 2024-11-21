// export { default } from "next-auth/middleware"
import { withAuth } from "next-auth/middleware"
export const config = { pages: {signIn: '/auth/signin'}, matcher: ['/', '/main'], secret: "x0NCOOymWv+aFes8G00rGFbQEP3wSselAN7qjWdtNBw=" }

export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
      console.log('dafdafd')
    },
    {
      callbacks: {
        authorized: ({ token }) => token,
      },
    },
  )
