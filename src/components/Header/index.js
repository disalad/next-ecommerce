'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX } from 'react-icons/fi';
import { MdStorefront } from 'react-icons/md';
import { useSession } from 'next-auth/react';

const Header = () => {
    const { data: session } = useSession();
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const pathname = usePathname();
    const isLoggedIn = !!session?.user;

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
            className={`fixed top-0 left-0 w-full h-[65px] md:h-[100px] z-50 transition-all duration-300 border-b border-gray-200
                ${
                    isHomePage && !isScrolled
                        ? 'bg-transparent text-white border-none'
                        : 'bg-white text-gray-800'
                }
                flex items-center px-6 md:px-12`}
        >
            <div className='flex items-center w-full'>
                {/* Logo */}
                <div className='flex items-center space-x-2'>
                    <MdStorefront size={30} />
                    <span className='font-bold text-lg'>
                        <Link href='/'>GreatGoodz</Link>
                    </span>
                </div>

                {/* Desktop Navigation Links */}
                <nav className='hidden md:flex space-x-10 mx-auto'>
                    <Link href='/products' className='hover:text-gray-600'>
                        Products
                    </Link>
                    <Link href='#' className='hover:text-gray-600'>
                        Sell Online
                    </Link>
                    <Link href='/about' className='hover:text-gray-600'>
                        About Us
                    </Link>
                </nav>

                {/* Icons and Mobile Menu Button */}
                <div className='flex space-x-6 items-center ml-auto md:ml-0'>
                    <button className='hover:text-gray-600'>
                        <FiSearch size={21} />
                    </button>
                    <Link href='/cart' className='hover:text-gray-600'>
                        <FiShoppingCart size={21} />
                    </Link>
                    <Link
                        href={isLoggedIn ? '/account' : '/login'}
                        className='hover:text-gray-600'
                    >
                        <FiUser size={21} />
                    </Link>
                    <button
                        className='md:hidden hover:text-gray-600'
                        aria-label='Open menu'
                        onClick={() => setMenuOpen(true)}
                    >
                        <FiMenu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div
                className={`fixed top-0 right-0 w-[250px] h-screen bg-white shadow-lg z-50 border-l border-gray-200 transition-transform transform ${
                    menuOpen ? 'translate-x-0' : 'translate-x-full'
                } md:hidden`}
            >
                <button
                    className='p-4 w-full text-left font-medium text-gray-800 hover:bg-gray-100'
                    aria-label='Close menu'
                    onClick={() => setMenuOpen(false)}
                >
                    <FiX size={24} />
                </button>
                <Link
                    href='/products'
                    className='block px-6 py-4 text-gray-800 hover:bg-gray-100'
                    onClick={() => setMenuOpen(false)}
                >
                    Products
                </Link>
                <Link
                    href='#'
                    className='block px-6 py-4 text-gray-800 hover:bg-gray-100'
                    onClick={() => setMenuOpen(false)}
                >
                    Sell Online
                </Link>
                <Link
                    href='/about'
                    className='block px-6 py-4 text-gray-800 hover:bg-gray-100'
                    onClick={() => setMenuOpen(false)}
                >
                    About Us
                </Link>
            </div>

            {/* Overlay when menu is open */}
            {menuOpen && (
                <div
                    className='fixed inset-0 bg-black bg-opacity-50 md:hidden z-30'
                    onClick={() => setMenuOpen(false)}
                ></div>
            )}
        </header>
    );
};

export default Header;
