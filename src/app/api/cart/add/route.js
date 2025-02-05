import { NextResponse } from 'next/server';
import { addItemToCart } from '@/lib/cart/cartService';
import { auth } from '@/auth';

export async function POST(request) {
    const session = await auth();
    const userId = session.user.id;

    try {
        const newItem = await request.json();
        const result = await addItemToCart(newItem, userId);

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to add item to cart' },
            { status: 500 }
        );
    }
}
