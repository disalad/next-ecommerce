import { NextResponse } from 'next/server';
import { getCartItems, addItemToCart } from '@/lib/cart/cartService';
import { auth } from '@/auth';

export async function GET(request) {
    const session = await auth();
    const userId = session.user.id;

    try {
        const cartItems = (await getCartItems(userId)) || [];
        return NextResponse.json({ ...cartItems._doc });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to get cart items' },
            { status: 500 }
        );
    }
}
