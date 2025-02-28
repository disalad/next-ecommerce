'use client';

import { useRef } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { useCart } from '@/context/CartContext';
import { getNewPrice } from '@/utils/numberUtils';
import Link from 'next/link';
import { ThreeDots } from 'react-loader-spinner';
import CartItem from '@/components/Cart/CartItem';

const Cart = () => {
    const { cart, cartLoading } = useCart();

    const totalCost = cart?.items?.reduce(
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
                <span className='col-span-1  '>Price</span>
            </div>
            {/* Show loader while loading */}
            {cartLoading ? (
                <div className='text-center flex justify-center mt-4 mb-12'>
                    <ThreeDots
                        visible={true}
                        height='80'
                        width='80'
                        color='#000'
                        radius='5'
                        ariaLabel='three-dots-loading'
                        wrapperStyle={{}}
                        wrapperClass=''
                    />
                </div>
            ) : (
                <div>
                    {cart.items.map((item, idx) => (
                        <CartItem item={item} key={idx} />
                    ))}
                </div>
            )}
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
                        Total cost <strong>${totalCost?.toFixed(2)}</strong>
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
