'use server';
import { signIn } from '@/auth';

export const signupUserCredentials = async data => {
    const { fullName, email, password, confirmPassword } = data;
    console.log('data: ', data);

    // Validate the sign-up data

    try {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result.error) {
            throw new Error('Sign-in error:', result.error);
        } else {
            console.log('Sign-in successful:', result);
            // Handle post-login logic (Navigate to the dashboard)
        }
    } catch (error) {
        throw new Error('An unexpected error occurred:', error);
    }
};

export const logInUserCredentials = async data => {
    const { email, password, rememberMe } = data;
    console.log('data: ', data);

    // Validate the login-up data

    try {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        if (result.error) {
            throw new Error('Log-in error:', result.error);
        } else {
            console.log('Log-in successful:', result);
            // Handle post-login logic (Navigate to the dashboard)
        }
    } catch (error) {
        throw new Error('An unexpected error occurred:', error);
    }
};
