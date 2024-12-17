'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { MdStorefront } from 'react-icons/md';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    const isHomePage = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 5);
        };

        if (isHomePage) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isHomePage]);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 shadow-none border-b border-gray-200
        ${isHomePage && !isScrolled ? 'bg-transparent' : 'bg-white'} 
        ${isHomePage ? (isScrolled ? 'text-gray-800' : 'text-white') : 'text-gray-800'}`}
        >
            <div className='flex justify-between items-center px-12 py-8'>
                {/* Logo */}
                <div className='flex items-center space-x-2'>
                    <MdStorefront size={30} />
                    <span className='font-bold text-lg'>
                        <Link href='/'>GreatGoodz</Link>
                    </span>
                </div>

                {/* Navigation Links */}
                <nav>
                    <ul className='flex space-x-16 font-normal'>
                        <li className='cursor-pointer'>
                            <Link href='/products'>Products</Link>
                        </li>
                        <li className='cursor-pointer'>
                            <Link href='#'>Sell Online</Link>
                        </li>
                        <li className='cursor-pointer'>
                            <Link href='/about'>About Us</Link>
                        </li>
                    </ul>
                </nav>

                {/* Icons */}
                <div className='flex space-x-8'>
                    <button className='hover:text-gray-900'>
                        <FiSearch size={21} />
                    </button>
                    <button className='hover:text-gray-900'>
                        <Link href='/cart'>
                            <FiShoppingCart size={21} />
                        </Link>
                    </button>
                    <button className='hover:text-gray-900'>
                        <Link href='/login'>
                            <FiUser size={21} />{' '}
                        </Link>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
