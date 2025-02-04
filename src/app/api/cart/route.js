import { NextResponse } from 'next/server';
// import { getCartItems, addItemToCart } from '@/lib/cartService';
import { auth } from '@/auth';

export async function GET(request) {
    const session = await auth();
    console.log('session', session);

    try {
        // const cartItems = await getCartItems();
        return NextResponse.json({ cartItems: [] });
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
        // const result = await addItemToCart(newItem);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to add item to cart' },
            { status: 500 }
        );
    }
}
