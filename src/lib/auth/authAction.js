'use server';

import { signIn } from '@/auth';
import { validateLogInData, validateSignUpData } from './validate';
import {
    InvalidCredentialsError,
    MemberNotFoundError,
    MemberAlreadyExistsError,
} from './errors';

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
    try {
        await signIn('credentials', {
            email,
            password,
            redirect: false, // Prevent automatic redirection
        });
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return {
                success: false,
                message: 'Invalid email or password.',
                result: null,
            };
        } else if (error instanceof MemberNotFoundError) {
            return {
                success: false,
                message: 'Member not found.',
                result: null,
            };
        } else if (error instanceof MemberAlreadyExistsError) {
            return {
                success: false,
                message: 'Member already exists.',
                result: null,
            };
        } else {
            return {
                success: false,
                message: 'Could not parse data.',
                result: null,
            };
        }
    }

    if (validatedData.message) {
        const error = validatedData.message;
        return { success: false, message: error, result: null };
    }
    return { success: true, message: 'Log-in successful!', result };
};
