import NextAuth from 'next-auth';
import { authConfig } from './auth.config.js';
import Credentials from 'next-auth/providers/credentials';
import { authorizeUser } from '@/lib/auth/userAction';

export const {
    auth,
    signIn,
    signOut,
    handlers: { GET, POST },
} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: authorizeUser,
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.user = {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                };
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});
