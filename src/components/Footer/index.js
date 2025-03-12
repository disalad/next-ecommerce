import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaYoutube,
} from 'react-icons/fa';
import { MdStorefront } from 'react-icons/md';

const Footer = () => {
    return (
        <footer className='pt-10 md:pt-16 bg-gray-100'>
            <div className='container mx-auto px-4'>
                <div className='md:flex md:justify-between md:pb-12 pb-6'>
                    <div className='md:w-1/3 mb-8 md:mb-0'>
                        <h6 className='flex items-center text-black font-light mb-8 text-lg'>
                            <MdStorefront className='w-11 h-9 mr-4 text-black' />
                            <span className='font-medium text-orange-500'>
                                Great
                            </span>
                            Goodz
                        </h6>
                        <p className='text-sm leading-relaxed text-gray-600'>
                            House My Brand designs clothing for the young, the
                            old & everyone in between – but most importantly,
                            for the fashionable.
                        </p>
                        <ul className='flex mt-5 space-x-6 text-2xl'>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-600 hover:text-gray-900'
                                >
                                    <FaFacebookF />
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-600 hover:text-gray-900'
                                >
                                    <FaTwitter />
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-600 hover:text-gray-900'
                                >
                                    <FaLinkedinIn />
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-600 hover:text-gray-900'
                                >
                                    <FaInstagram />
                                </a>
                            </li>
                            <li>
                                <a
                                    href='#'
                                    className='text-gray-600 hover:text-gray-900'
                                >
                                    <FaYoutube />
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className='md:flex md:space-x-16 w-full md:w-auto'>
                        {[
                            {
                                title: 'Shopping Online',
                                links: [
                                    'Order Status',
                                    'Shipping and Delivery',
                                    'Returns',
                                    'Payment Options',
                                    'Contact Us',
                                ],
                            },
                            {
                                title: 'Information',
                                links: [
                                    'Gift Cards',
                                    'Find a Store',
                                    'Newsletter',
                                    'Become a Member',
                                    'Site Feedback',
                                ],
                            },
                            {
                                title: 'Contact',
                                links: [
                                    'example@gmail.com',
                                    'Hotline: 0123456789',
                                ],
                            },
                        ].map((section, index) => (
                            <ul key={index} className='mb-10 md:mb-0'>
                                <li className='font-semibold text-black mb-6'>
                                    {section.title}
                                </li>
                                {section.links.map((link, idx) => (
                                    <li
                                        key={idx}
                                        className='text-gray-600 mb-3 hover:underline cursor-pointer'
                                    >
                                        {link}
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>

            <div className='border-t border-gray-300 py-6 text-center text-sm text-gray-500'>
                DESIGN BY DISALA YUTHMIRA - &copy; {new Date().getFullYear()}.
                ALL RIGHTS RESERVED.
            </div>
        </footer>
    );
};

export default Footer;
