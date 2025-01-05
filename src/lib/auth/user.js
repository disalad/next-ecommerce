import bcrypt from 'bcrypt';
import dbConnect from '@/lib/db/mongodb';
import User from '@/models/User';

// This function implements the behavior: If the user is found,
// the function will return the existing user. If the user is not found,
// the function will create a new user. This function is used in the `authorize` property
// of the Credentials provider in the auth object.

export const authorizeUser = async (credentials) => {
    const { name, email, password, callbackUrl } = credentials;

    await dbConnect();
    const foundUser = await User.findOne({ email: email }); // Find a user with the email
    const passwordMatch = foundUser
        ? await bcrypt.compare(password, foundUser.password) // Compare the password
        : null;

    const fromLogin = callbackUrl.includes('login'); // Check if the request is from the login page
    if (foundUser && passwordMatch && fromLogin) {
        console.log('Found user: ', foundUser);
        return foundUser; // If the user is found, return the user
    } else if (foundUser && !passwordMatch && fromLogin) {
        throw new Error('Password does not match'); // Throw an error if the password does not match
    } else if (!foundUser && fromLogin) {
        throw new Error('User not found'); // Throw an error if the user is not found
    } else if (foundUser && passwordMatch && !fromLogin) {
        throw new Error('User already exists'); // Throw an error if the user already exists
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
