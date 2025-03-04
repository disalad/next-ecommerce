import Components from './(index)/Components';
import Providers from './(index)/Providers';
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
                    <Components>{children}</Components>
                </Providers>
            </body>
        </html>
    );
}
