import mongoose from 'mongoose';

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) return;

    const mongodbURI = process.env.MONGODB_URI;

    if (!mongodbURI) {
        throw new Error('MONGODB_URI is not defined');
    }

    return mongoose.connect(mongodbURI, {});
};

export default dbConnect;
