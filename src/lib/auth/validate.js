export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

export const validateSignUpData = data => {
    const { fullName, email, password, confirmPassword } = data;
    const nameArr = fullName.split(' ');

    let error = new ValidationError();
    error.code = 400;

    // Check whether all fields are filled
    if (!fullName || !email || !password || !confirmPassword) {
        error.message = 'All fields are required';
    }
    // Check whether password and password confirmation match
    if (password !== confirmPassword) {
        error.message = "Passwords don't match";
    }
    // Check whether full name contains at least two words
    if (nameArr.length < 2) {
        error.message = 'Full name must contain at least two words';
    }
    // Check whether email is valid
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        error.message = 'Invalid email';
    }
    // Check whether password is at least 8 characters long
    if (password.length < 8) {
        error.message = 'Password must be at least 8 characters long';
    }
    // Check whether password contains at least one letter and one number
    if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
        error.message = 'Password must contain at least one letter and one number';
    }
    // If any error occurred, throw it
    if (error.message) return error;

    return data;
};

export const validateLogInData = data => {
    const { email, password } = data;

    let error = new ValidationError();
    error.code = 400;

    // Check whether all fields are filled
    if (!email || !password) {
        error.message = 'All fields are required';
    }
    // Check whether email is valid
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        error.message = 'Invalid email';
    }
    // If any error occurred, throw it
    if (error.message) return error;

    return data;
};
