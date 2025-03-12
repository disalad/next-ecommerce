'use client';

import Link from 'next/link';
import { useState } from 'react';

const CheckoutPage = () => {
    const [form, setForm] = useState({
        email: '',
        address: '',
        firstName: '',
        city: '',
        lastName: '',
        postalCode: '',
        phone: '',
        country: '',
    });

    const [paymentMethod, setPaymentMethod] = useState(null);
    const [deliveryMethod, setDeliveryMethod] = useState(null);
    const totalCost = 629.93;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <section className='p-8 min-h-screen'>
            <div className='max-w-6xl mx-auto  py-8 rounded-lg shadow-none'>
                <h3 className='text-2xl font-semibold mb-6'>
                    Shipping and Payment
                </h3>

                <div className='flex flex-wrap justify-between checkout-content'>
                    {/* Shipping Information */}
                    <div className='checkout__col-6'>
                        <h3 className='text-lg font-semibold mb-4 '>
                            Shipping information
                        </h3>
                        <form className='space-y-4'>
                            <div className='flex flex-col gap-4'>
                                {/* Row 1 */}
                                <div className='flex gap-4'>
                                    <input
                                        className='w-full border rounded-full px-8 h-12'
                                        type='text'
                                        name='email'
                                        placeholder='Email'
                                        onChange={handleChange}
                                    />
                                    <input
                                        className='w-full border rounded-full px-8 h-12'
                                        type='text'
                                        name='address'
                                        placeholder='Address'
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Row 2 */}
                                <div className='flex gap-4'>
                                    <input
                                        className='w-full border rounded-full px-8 h-12'
                                        type='text'
                                        name='firstName'
                                        placeholder='First name'
                                        onChange={handleChange}
                                    />
                                    <input
                                        className='w-full border rounded-full px-8 h-12'
                                        type='text'
                                        name='city'
                                        placeholder='City'
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Row 3 */}
                                <div className='flex gap-4'>
                                    <input
                                        className='w-full border rounded-full px-8 h-12'
                                        type='text'
                                        name='lastName'
                                        placeholder='Last name'
                                        onChange={handleChange}
                                    />
                                    <input
                                        className='w-full border rounded-full px-8 h-12'
                                        type='text'
                                        name='postalCode'
                                        placeholder='Postal code / ZIP'
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Row 4 */}
                                <div className='flex gap-4'>
                                    <input
                                        className='w-full border rounded-full px-8 h-12'
                                        type='text'
                                        name='phone'
                                        placeholder='Phone number'
                                        onChange={handleChange}
                                    />
                                    <select
                                        className='w-full border rounded-full px-8 h-12'
                                        name='country'
                                        onChange={handleChange}
                                    >
                                        <option>Country</option>
                                        <option value='Sri Lanka'>
                                            Sri Lanka
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Payment and Delivery Method */}
                    <div className='checkout__col-4'>
                        <h3 className='text-lg font-semibold mb-4'>
                            Payment method
                        </h3>
                        <div className='grid grid-cols-3 gap-2'>
                            {[
                                'Paypal',
                                'Visa',
                                'Mastercard',
                                'Maestro',
                                'Discover',
                                'iDEAL',
                            ].map((method, idx) => (
                                <button
                                    key={method}
                                    className='border p-2 rounded-full flex items-center justify-center'
                                    onClick={() => setPaymentMethod(method)}
                                >
                                    <img
                                        src={`/logos/${method.toLowerCase()}.png`}
                                        alt={method}
                                        key={idx}
                                    ></img>
                                </button>
                            ))}
                        </div>

                        <h3 className='text-lg font-semibold mb-4 mt-6'>
                            Delivery method
                        </h3>
                        <div className='grid grid-cols-2 gap-2'>
                            {[
                                {
                                    name: 'InPost',
                                    price: 20,
                                    logo: 'inpost.svg',
                                },
                                { name: 'dpd', price: 12, logo: 'dpd.svg' },
                                { name: 'DHL', price: 15, logo: 'dhl.svg' },
                                {
                                    name: 'Maestro',
                                    price: 10,
                                    logo: 'maestro.png',
                                },
                            ].map((method) => (
                                <button
                                    key={method.name}
                                    className='border p-2 rounded-full flex justify-evenly items-center'
                                    onClick={() =>
                                        setDeliveryMethod(method.name)
                                    }
                                >
                                    <img
                                        src={`/logos/${method.logo}`}
                                        alt={method.name}
                                    ></img>{' '}
                                    <span>${method.price}.00</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Cart Summary */}
                    <div className='checkout__col-2'>
                        <h3 className='text-lg font-semibold mb-4'>
                            Your cart
                        </h3>
                        <div className='border p-4 rounded mb-4'>
                            <p className='text-gray-700'>
                                T-Shirt Summer Vibes - $89.99
                            </p>
                            <p className='text-gray-700'>
                                T-Shirt Summer Vibes - $89.99
                            </p>
                        </div>
                        <div className='flex justify-between font-semibold text-lg'>
                            <p>Total cost</p>
                            <p>${totalCost}</p>
                        </div>
                    </div>
                </div>

                <div className='flex justify-between mt-6'>
                    <Link href='/cart'>
                        <button className='text-gray-700'>&larr; Back</button>
                    </Link>
                    <div className='flex gap-4'>
                        <Link href='/products'>
                            <button className='px-5 py-2 md:py-3 border border-gray-400 rounded-full text-sm'>
                                Continue shopping
                            </button>
                        </Link>
                        <button className='px-5 py-2 md:py-3 bg-yellow-400 rounded-full text-sm'>
                            Proceed to payment
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;
