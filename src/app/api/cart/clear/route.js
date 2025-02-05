import { NextResponse } from 'next/server';
import { clearCart } from '@/lib/cart/cartService';
import { auth } from '@/auth';

export async function DELETE(request) {
    const session = await auth();
    const userId = session.user.id;

    try {
        const result = await clearCart(userId);
        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Failed to clear the cart' },
            { status: 500 }
        );
    }
}
