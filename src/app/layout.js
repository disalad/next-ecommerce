import Header from '@/components/Header';
import './globals.css';

export const metadata = {
    title: 'GreatGoodz',
    description: 'Made with love by Disala',
};

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <Header />
                {children}
            </body>
        </html>
    );
}
