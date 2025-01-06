import bcrypt from 'bcrypt';
import dbConnect from '@/lib/db/mongodb';
import User from '@/models/User';
import {
    MemberNotFoundError,
    InvalidCredentialsError,
    MemberAlreadyExistsError,
} from '@/lib/auth/errors';

export const authorizeUser = async (credentials) => {
    const { name, email, password, callbackUrl } = credentials;

    await dbConnect();
    const foundUser = await User.findOne({ email: email }); // Find a user with the email
    const passwordMatch = foundUser
        ? await bcrypt.compare(password, foundUser.password)
        : null;

    const fromLogin = callbackUrl.includes('login');
    if (foundUser && passwordMatch && fromLogin) {
        console.log('Found user: ', foundUser);
        return foundUser; // If the user is found, return the user
    } else if (foundUser && !passwordMatch && fromLogin) {
        throw new InvalidCredentialsError('Invalid credentials'); // If the password does not match, throw an error
    } else if (!foundUser && fromLogin) {
        throw new MemberNotFoundError('Member not found'); // If the user is not found, throw an error
    } else if (foundUser && !fromLogin) {
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
        name,
        email,
        password: hashedPassword,
    });
    await newUser.save(); // Save the new user

    console.log('Created user: ', newUser);
    return credentials;
};
