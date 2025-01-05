'use server';

import { signIn } from '@/auth';
import { validateLogInData, validateSignUpData } from './validate';

export const signupUserCredentials = async (data) => {
    const { fullName, email, password, _confirmPassword } = data;

    // Validate the sign-up data
    const validatedData = validateSignUpData(data);

    // Call the NextAuth sign-in
    const result = await signIn('credentials', {
        name: fullName,
        email,
        password,
        redirect: false, // Prevent automatic redirection
    });

    if (result.error || validatedData.message) {
        const error = validatedData.message || result.error;
        return { success: false, message: error, result: null };
    }
    return { success: true, message: 'Log-in successful!', result };
};

export const logInUserCredentials = async (data) => {
    const { email, password } = data;

    // Validate login data
    const validatedData = validateLogInData(data);

    // Call the NextAuth sign-in
    const result = await signIn('credentials', {
        email,
        password,
        redirect: false, // Prevent automatic redirection
    });

    if (result.error || validatedData.message) {
        const error = validatedData.message || result.error;
        return { success: false, message: error, result: null };
    }
    return { success: true, message: 'Log-in successful!', result };
};
