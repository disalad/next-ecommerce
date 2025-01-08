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
    const validationResult = validateLogInData(data);
    if (validationResult.message) {
        return {
            success: false,
            message: validationResult.message,
            result: null,
        };
    }

    try {
        // Attempt to sign in with credentials
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        return {
            success: true,
            message: 'Log-in successful!',
            result,
        };
    } catch (error) {
        // Handle specific errors
        const errorMessage = getErrorMessage(error);
        return {
            success: false,
            message: errorMessage,
            result: null,
        };
    }
};

// Helper function to map errors to user-friendly messages
const getErrorMessage = (error) => {
    if (error instanceof InvalidCredentialsError) {
        return 'Invalid email or password.';
    }
    if (error instanceof MemberNotFoundError) {
        return 'Member not found.';
    }
    if (error instanceof MemberAlreadyExistsError) {
        return 'Member already exists.';
    }
    return 'An unexpected error occurred.';
};
