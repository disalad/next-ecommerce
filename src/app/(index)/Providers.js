'use client';

import { SessionProvider } from 'next-auth/react';
import { AlertBoxContextProvider } from '@/context/AlertBoxContext';
import { CartContextProvider } from '@/context/CartContext';
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';
import { usePathname } from 'next/navigation';

function Providers({ children }) {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const color = isHomePage ? '#FCE205' : '#64B5F6';

    return (
        <SessionProvider>
            <AlertBoxContextProvider>
                <CartContextProvider>
                    <ProgressProvider
                        height='4px'
                        color={color}
                        options={{ showSpinner: false }}
                        shallowRouting
                    >
                        {children}
                    </ProgressProvider>
                </CartContextProvider>
            </AlertBoxContextProvider>
        </SessionProvider>
    );
}

export default Providers;
