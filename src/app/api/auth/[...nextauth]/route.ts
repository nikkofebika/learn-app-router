import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

export const authOption: AuthOptions = {
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),
        // Credentials({
        //     authorize: async (credentials) => {
        //         return {
        //             id: credentials?.email
        //         }
        //     }
        // })
    ]
}

const handler = NextAuth(authOption);
export { handler as GET, handler as POST };
