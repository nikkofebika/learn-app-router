import { AuthOptions, Awaitable, RequestInternal, User } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

export const authOption: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    providers: [
        // GitHubProvider({
        //     clientId: process.env.GITHUB_ID as string,
        //     clientSecret: process.env.GITHUB_SECRET as string
        // }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // console.log('req', req)
                console.log('credentials', credentials)
                const { email, password } = credentials as { email: string, password: string }

                const user = {
                    name: "Joni doe",
                    email: "user@gmail.com",
                    password: "12345678"
                }

                if (email == user.email && password == user.password) {
                    return user;
                }

                return null;
            }
        })
    ],
    callbacks: {
        async session({ session, user, token }) {
            console.log('session', session)
            console.log('user', user)
            console.log('token', token)
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log('JWT')
            console.log('token', token)
            console.log('user', user)
            console.log('account', account)
            console.log('profile', profile)
            return token
        }
    },
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
