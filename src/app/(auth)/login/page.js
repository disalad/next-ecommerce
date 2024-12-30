import { FaFacebookF } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import Link from 'next/link';

function Login() {
    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-200 pt-16 pb-20'>
            <div className='w-full max-w-lg px-10 py-14 bg-white shadow-none border border-gray-200 rounded-2xl'>
                <h2 className='text-2xl font-bold text-center mb-10'>Log in</h2>
                <form>
                    <div className='mb-6'>
                        <input
                            type='email'
                            placeholder='email'
                            className='signin__button text-gray-700 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-300'
                        />
                    </div>
                    <div className='mb-6'>
                        <input
                            type='password'
                            placeholder='Password'
                            className='signin__button text-gray-700 bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-300'
                        />
                    </div>
                    <div className='flex items-center justify-between mb-8 px-2'>
                        <label className='flex items-center'>
                            <input
                                type='checkbox'
                                className='w-4 h-4 text-indigo-500 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500'
                            />
                            <span className='ml-2 text-sm text-gray-600'>Keep me signed in</span>
                        </label>
                        <a href='#' className='text-sm text-indigo-500 hover:underline'>
                            Forgot password?
                        </a>
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
                        Sign in
                    </button>
                </form>
                <p className='mt-4 text-center text-sm text-gray-600'>
                    Not a member yet?{' '}
                    <Link href='/signup' className='text-indigo-500 hover:underline'>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
