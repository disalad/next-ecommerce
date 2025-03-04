import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Providers from './Providers';
import '@/styles/styles.scss';

export const metadata = {
    title: 'GreatGoodz',
    description: 'Made with love by Disala',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <Providers>
                    <Header />
                    <div style={{ height: '95px' }}></div>
                    {children}
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
