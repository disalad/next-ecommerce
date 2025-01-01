import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';
import { MdStorefront } from 'react-icons/md';

const Footer = () => {
    return (
        <footer className='site-footer bg-gray-100 px-0 py-0'>
            <div className='container mx-0 lg:px-8 xl:px-16 py-12'>
                <div className='site-footer__top flex flex-col md:flex-row justify-between'>
                    <div className='site-footer__description mb-6 md:mb-0'>
                        <h6 className='flex items-center text-xl font-bold mb-7'>
                            <MdStorefront size={25} />
                            <span className='ml-2'>GreatGoodz</span>
                        </h6>
                        <p className='text-gray-600 text-sm md:text-base max-w-md mb-7 font-light'>
                            House My Brand designs clothing for the young, the old & everyone in
                            between – but most importantly, for the fashionable
                        </p>
                        <ul className='site-footer__social-networks flex space-x-7'>
                            <li>
                                <Link href='#' className='text-gray-600 hover:text-gray-800'>
                                    <FaFacebookF size={18} />
                                </Link>
                            </li>
                            <li>
                                <Link href='#' className='text-gray-600 hover:text-gray-800'>
                                    <FaTwitter size={18} />
                                </Link>
                            </li>
                            <li>
                                <Link href='#' className='text-gray-600 hover:text-gray-800'>
                                    <FaLinkedinIn size={18} />
                                </Link>
                            </li>
                            <li>
                                <Link href='#' className='text-gray-600 hover:text-gray-800'>
                                    <FaInstagram size={18} />
                                </Link>
                            </li>
                            <li>
                                <Link href='#' className='text-gray-600 hover:text-gray-800'>
                                    <FaYoutube size={18} />
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className='site-footer__links grid grid-cols-1 md:grid-cols-3 gap-8'>
                        <div>
                            <h6 className='font-bold mb-4'>Shopping online</h6>
                            <ul className='text-gray-600 space-y-1 font-light'>
                                <li>
                                    <Link href='#' className='hover:underline'>
                                        Order Status
                                    </Link>
                                </li>
                                <li>
                                    <Link href='#' className='hover:underline'>
                                        Shipping and Delivery
                                    </Link>
                                </li>
                                <li>
                                    <Link href='#' className='hover:underline'>
                                        Returns
                                    </Link>
                                </li>
                                <li>
                                    <Link href='#' className='hover:underline'>
                                        Payment options
                                    </Link>
                                </li>
                                <li>
                                    <Link href='#' className='hover:underline'>
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h6 className='font-bold mb-4'>Information</h6>
                            <ul className='text-gray-600 space-y-1 font-light'>
                                <li>
                                    <Link href='#' className='hover:underline'>
                                        Gift Cards
                                    </Link>
                                </li>
                                <li>
                                    <Link href='#' className='hover:underline'>
                                        Find a store
                                    </Link>
                                </li>
                                <li>
                                    <Link href='#' className='hover:underline'>
                                        Newsletter
                                    </Link>
                                </li>
                                <li>
                                    <Link href='#' className='hover:underline'>
                                        Become a member
                                    </Link>
                                </li>
                                <li>
                                    <Link href='#' className='hover:underline'>
                                        Site feedback
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h6 className='font-bold mb-4'>Contact</h6>
                            <ul className='text-gray-600 space-y-1 font-light'>
                                <li>
                                    <Link
                                        href='mailto:store@greatgoodz.com'
                                        className='hover:underline'
                                    >
                                        store@greatgoodz.com
                                    </Link>
                                </li>
                                <li>
                                    <Link href='tel:+94771051051' className='hover:underline'>
                                        Hotline: +94 77 105 1051
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className='site-footer__bottom bg-gray-200 py-4'>
                <div className='container mx-auto text-center text-gray-600 text-xs'>
                    <p>DEVELOPED BY DISALA YUTHMIRA - &#169; 2024.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
