import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
    {
        userId: {
            ref: 'User', // Reference to User model
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
            trim: true,
        },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
            },
        ],
    },
    { timestamps: true }
);

const Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);

export default Cart;
