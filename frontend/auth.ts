// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"

// export const { handlers, signIn, signOut, auth } = NextAuth({
//     providers: [Google],
// })

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
        }),
    ],

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/",
    },

    callbacks: {
        async jwt({ token, account, profile }) {
            if (account && profile) {
                token.id = profile.sub;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }

            return session;
        },

        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;

            const protectedRoutes = [
                "/workspace",
                "/dashboard",
            ];

            const isProtectedRoute = protectedRoutes.some((route) =>
                nextUrl.pathname.startsWith(route)
            );

            if (isProtectedRoute && !isLoggedIn) {
                return false;
            }

            return true;
        },
    },

    debug: process.env.NODE_ENV === "development",
} satisfies NextAuthConfig;

export const {
    handlers,
    auth,
    signIn,
    signOut,
} = NextAuth(authConfig);