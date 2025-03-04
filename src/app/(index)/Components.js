'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { usePathname } from 'next/navigation';

function Components({ children }) {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    return (
        <>
            <Header />
            <div style={isHomePage ? null : { height: '95px' }}></div>
            {children}
            <Footer />
        </>
    );
}

export default Components;
