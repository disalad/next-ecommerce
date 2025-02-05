import { NextResponse } from 'next/server';
import { getCartItems, addItemToCart } from '@/lib/cart/cartService';
import { auth } from '@/auth';

export async function GET(request) {
    const session = await auth();
    const userId = session.user.id;

    try {
        const cartItems = (await getCartItems(userId)) || [];
        console.log('cartItems', cartItems);
        return NextResponse.json({ ...cartItems._doc });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to get cart items' },
            { status: 500 }
        );
    }
}

export async function POST(request) {
    try {
        const newItem = await request.json();
        const result = await addItemToCart(newItem);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to add item to cart' },
            { status: 500 }
        );
    }
}
