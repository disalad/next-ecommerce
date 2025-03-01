import bcrypt from 'bcrypt';
import dbConnect from '@/lib/db/mongodb';
import User from '@/models/User';
import Cart from '@/models/Cart';
import {
    MemberNotFoundError,
    InvalidCredentialsError,
    MemberAlreadyExistsError,
} from '@/lib/auth/errors';

export const authorizeUser = async (credentials) => {
    const { email, password, callbackUrl } = credentials;

    await dbConnect();
    const foundUser = await User.findOne({ email: email }); // Find a user with the email
    const passwordMatch = foundUser
        ? await bcrypt.compare(password, foundUser.password)
        : null;

    if (foundUser && passwordMatch) {
        console.log('Found user: ', foundUser);
        return foundUser; // If the user is found, return the user
    } else if (foundUser && !passwordMatch) {
        throw new InvalidCredentialsError('Invalid credentials'); // If the password does not match, throw an error
    } else if (!foundUser) {
        throw new MemberNotFoundError('Member not found'); // If the user is not found, throw an error
    }
};

export const createUserInDatabase = async (credentials) => {
    const { fullName, email, password } = credentials;

    await dbConnect();
    const foundUser = await User.findOne({ email: email }); // Find a user with the email

    if (foundUser) {
        throw new MemberAlreadyExistsError('Member already exists'); // If the user already exists, throw an error
    }

    // Hash the password to create a new user
    const saltRounds = process.env.SALT_ROUNDS || 10; // Get the salt rounds
    let hashedPassword;
    try {
        hashedPassword = await bcrypt.hash(password, Number(saltRounds));
    } catch (error) {
        throw new Error('Failed to hash password');
    }

    // If the user is not found, create a new user
    const newUser = new User({
        name: fullName,
        email,
        password: hashedPassword,
    });
    await newUser.save(); // Save the new user

    console.log('Created user: ', newUser);
    return Object(newUser);
};

export const deleteUserFromDatabase = async (userId) => {
    await dbConnect();

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
        throw new MemberNotFoundError('Member not found');
    }

    try {
        await Cart.findOneAndDelete({ userId });
    } catch (error) {}

    return { success: true, message: 'User deleted successfully' };
};
