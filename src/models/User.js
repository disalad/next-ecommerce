import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true, // Removes whitespace from both ends of the string
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures no two users have the same email
        lowercase: true, // Converts the value to lowercase before saving
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Enforces a minimum length of 6 characters
    },
    createdAt: {
        type: Date,
        default: Date.now, // Automatically sets the current date and time
    },
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
