'use client';

import { useRef } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useCart } from '@/context/CartContext';
import { getNewPrice } from '@/utils/numberUtils';
import { removeFromCart, addToCart } from '@/utils/cartUtils';
import Link from 'next/link';

const Cart = () => {
    const { cart, setCart, refetchCart } = useCart();
    const updateTimeoutRef = useRef({}); // Store timeouts to debounce API calls

    const handleQuantityChange = (productId, amount) => {
        // Cancel any previous timeout for this product
        if (updateTimeoutRef.current[productId]) {
            clearTimeout(updateTimeoutRef.current[productId]);
        }

        // Debounce the API call by 500ms
        updateTimeoutRef.current[productId] = setTimeout(async () => {
            try {
                const newQuantity =
                    cart.items.find((item) => item.productId === productId)
                        ?.quantity + amount;
                await addToCart(productId, Math.max(1, newQuantity));
                await refetchCart(); // Refetch the cart after the update

                // Update global cart state after successful update
                setCart((prevCart) => ({
                    ...prevCart,
                    items: prevCart.items.map((item) =>
                        item.productId === productId
                            ? { ...item, quantity: Math.max(1, newQuantity) }
                            : item
                    ),
                }));
            } catch (err) {
                console.error('Failed to update cart');
            }
        }, 500);
    };

    const handleProductRemoval = async (productId) => {
        // Update global cart state after product removal
        setCart((prevCart) => ({
            ...prevCart,
            items: prevCart.items.filter(
                (item) => item.productId !== productId
            ),
        }));

        // Cancel any previous timeout for this product
        if (updateTimeoutRef.current[productId]) {
            clearTimeout(updateTimeoutRef.current[productId]);
        }

        await removeFromCart(productId);
        await refetchCart();
    };

    const totalCost = cart.items.reduce(
        (sum, item) =>
            sum +
            getNewPrice(item.price, item.discountPercentage) * item.quantity,
        0
    );

    return (
        <div className='max-w-5xl mx-auto p-6'>
            <h2 className='text-2xl font-semibold mb-10'>Shopping Cart</h2>
            <div className='grid grid-cols-5 gap-4 text-gray-500 font-semibold border-b pb-3'>
                <span className='col-span-3'>Product</span>
                <span className='col-span-1'>Amount</span>
                <span className='col-span-1'>Price</span>
            </div>
            {cart.items.map((item) => {
                const itemPrice = getNewPrice(
                    item.price,
                    item.discountPercentage
                );
                return (
                    <div
                        key={item.productId}
                        className='grid grid-cols-5 gap-4 items-center py-4 border-b'
                    >
                        <div className='col-span-3 flex items-center gap-4'>
                            <img
                                src={item.coverImage}
                                alt={item.title}
                                className='w-12 h-12 rounded-full'
                            />
                            <span className='font-semibold'>{item.title}</span>
                        </div>
                        <div className='col-span-1'>
                            <div className='flex items-center border rounded-lg max-w-fit'>
                                <button
                                    className='px-3 py-1'
                                    onClick={() =>
                                        handleQuantityChange(item.productId, -1)
                                    }
                                >
                                    -
                                </button>
                                <span className='px-4'>{item.quantity}</span>
                                <button
                                    className='px-3 py-1'
                                    onClick={() =>
                                        handleQuantityChange(item.productId, 1)
                                    }
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className='col-span-1 flex justify-between items-center'>
                            <span>
                                ${(itemPrice * item.quantity).toFixed(2)}
                            </span>
                            <button
                                className='text-red-500'
                                onClick={() =>
                                    handleProductRemoval(item.productId)
                                }
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                );
            })}
            <div className='grid grid-cols-3 my-8 items-center'>
                <Link href='/products'>
                    <button className='flex items-center gap-2 text-black font-semibold'>
                        <IoMdArrowBack /> Continue Shopping
                    </button>
                </Link>
                <input
                    type='text'
                    placeholder='Promo Code'
                    className='border rounded-lg px-4 py-2'
                />
                <div className='flex justify-end items-center gap-4'>
                    <span className='font-semibold'>
                        Total cost <strong>${totalCost.toFixed(2)}</strong>
                    </span>
                    <button className='bg-yellow-400 text-white px-6 py-2 rounded-lg font-semibold'>
                        CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
