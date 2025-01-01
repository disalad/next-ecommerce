import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authorizeUser } from '@/lib/auth/user';

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: authorizeUser,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
});
