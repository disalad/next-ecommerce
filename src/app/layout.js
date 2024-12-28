import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '@/styles/styles.scss';

export const metadata = {
    title: 'GreatGoodz',
    description: 'Made with love by Disala',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <Header />
                <div style={{ height: '95px' }}></div>
                {children}
                <Footer />
            </body>
        </html>
    );
}
