'use server';

import { signIn, signOut, auth } from '@/auth';
import { validateLogInData, validateSignUpData } from './validate';
import { createUserInDatabase, deleteUserFromDatabase } from './userAction';
import {
    InvalidCredentialsError,
    MemberNotFoundError,
    MemberAlreadyExistsError,
} from './errors';

// Sign-up logic: creates a new user and signs them in (handled by NextAuth)
export const signupUserCredentials = async (data) => {
    const { fullName, email, password, _confirmPassword } = data;

    // Validate the sign-up data
    const validatedData = validateSignUpData(data);
    if (validatedData.message) {
        return { success: false, message: validatedData.message, result: null };
    }

    try {
        const newUser = await createUserInDatabase(data);

        // Call NextAuth's signIn function which handles both authentication and JWT token generation
        const result = await signIn('credentials', {
            name: fullName,
            email,
            password,
            redirect: false, // Prevent automatic redirection
        });

        if (result.error) {
            return { success: false, message: result.error, result: null };
        }

        return {
            success: true,
            message: 'Sign-up successful and logged in!',
            result,
        };
    } catch (error) {
        return { success: false, message: handleError(error), result: null };
    }
};

// Log-in logic: handles JWT-based login through NextAuth's signIn
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
        // Attempt to sign in with credentials (NextAuth handles JWT token generation)
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false, // Prevent automatic redirection
        });

        if (result.error) {
            return { success: false, message: result.error, result: null };
        }

        return {
            success: true,
            message: 'Log-in successful!',
            result,
        };
    } catch (error) {
        return {
            success: false,
            message: handleError(error),
            result: null,
        };
    }
};

// Log-out logic
export const logOutUser = async () => {
    try {
        await signOut({ redirect: false });
        return { success: true, message: 'Logged out successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to log out' };
    }
};

// Delete account logic
export const deleteAccount = async () => {
    const session = await auth();
    const userId = session?.user?.id;

    if (!session?.user) return null;

    try {
        await deleteUserFromDatabase(userId);
        await signOut({ redirect: false }); // Ensure user is signed out after deletion
        return { success: true, message: 'Account deleted successfully' };
    } catch (error) {
        return { success: false, message: 'Failed to delete account' };
    }
};

// Helper function to map errors to user-friendly messages
const handleError = (error) => {
    if (error instanceof InvalidCredentialsError) {
        return 'Invalid email or password.';
    }
    if (error instanceof MemberNotFoundError) {
        return 'Member not found.';
    }
    if (error instanceof MemberAlreadyExistsError) {
        return 'Member already exists.';
    }
    if (error instanceof Error) {
        return error.message || 'An unexpected error occurred.';
    }
    return 'An unknown error occurred.';
};
