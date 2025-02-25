import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react';
import { AlertBoxContextProvider } from '@/context/AlertBoxContext';
import { CartContextProvider } from '@/context/CartContext';
import '@/styles/styles.scss';

export const metadata = {
    title: 'GreatGoodz',
    description: 'Made with love by Disala',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <SessionProvider>
                    <AlertBoxContextProvider>
                        <CartContextProvider>
                            <Header />
                            <div style={{ height: '95px' }}></div>
                            {children}
                            <Footer />
                        </CartContextProvider>
                    </AlertBoxContextProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
