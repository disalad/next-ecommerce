'use client';

import { FaFacebookF } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Link from 'next/link';
import { signupUserCredentials } from '@/lib/auth/authAction';
import { useAlertBox } from '@/context/AlertBoxContext';
import { useSession } from 'next-auth/react';
import { handleAuthResult } from '@/utils/sessionUtils';
import { useCart } from '@/context/CartContext';

function Signup() {
    const { showAlert } = useAlertBox();
    const { data: session, update } = useSession();
    const { refetchCart } = useCart();

    const handleSignUp = async (ev) => {
        ev.preventDefault();
        // Get form data
        const formData = new FormData(ev.target);
        const data = Object.fromEntries(formData.entries());

        // Sign up user
        const { success, message, _result } = await signupUserCredentials(data);

        // Notify user of the success or error
        try {
            await update();
            await refetchCart();
            handleAuthResult({ success }, 'signup');
            showAlert(message, 'success');
        } catch (error) {
            showAlert(message, 'error');
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-200 pt-16 pb-20'>
            <div className='w-full max-w-lg px-10 py-14 bg-white shadow-none border border-gray-200 rounded-2xl'>
                <h2 className='text-2xl font-bold text-center mb-10'>
                    Sign Up
                </h2>
                <form onSubmit={handleSignUp}>
                    <div className='mb-6'>
                        <input
                            type='text'
                            name='fullName'
                            placeholder='Full Name'
                            className='signin__button text-gray-700 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-300'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            className='signin__button text-gray-700 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-300'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
                            className='signin__button text-gray-700 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-300'
                            required
                        />
                    </div>
                    <div className='mb-6'>
                        <input
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirm Password'
                            className='signin__button text-gray-700 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-300'
                            required
                        />
                    </div>
                    <div className='flex justify-between gap-4 mb-6'>
                        <button
                            type='button'
                            className='signin__button flex items-center border border-blue-600 text-blue-600 shadow hover:bg-blue-100'
                        >
                            <FaFacebookF /> Facebook
                        </button>
                        <button
                            type='button'
                            className='signin__button flex items-center border border-red-500 text-red-500 hover:bg-red-100'
                        >
                            <MdEmail /> Gmail
                        </button>
                    </div>
                    <button
                        type='submit'
                        className='signin__button text-white bg-yellow-500 signin__button shadow hover:bg-yellow-600'
                    >
                        Sign Up
                    </button>
                </form>
                <p className='mt-4 text-center text-sm text-gray-600'>
                    Already have an account?{' '}
                    <Link
                        href='/login'
                        className='text-indigo-500 hover:underline'
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
