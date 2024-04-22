// export { default } from "next-auth/middleware"
import { NextRequestWithAuth, withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server";

export default withAuth(
    function middleware(req: NextRequest){
        console.log('REQUESTTTT',req.url)
    },
    {
    callbacks: {
        authorized: ({ token }) => {
            console.log('token', token);
            console.log('token', !token);
            console.log('token', !!token);
            console.log('token', Boolean(token));
            return !!token
        }
    }
});

export const config = { matcher: ["/"] }