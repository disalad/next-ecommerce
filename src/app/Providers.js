'use client';

import { SessionProvider } from 'next-auth/react';
import { AlertBoxContextProvider } from '@/context/AlertBoxContext';
import { CartContextProvider } from '@/context/CartContext';
import { AppProgressProvider as ProgressProvider } from '@bprogress/next';

function Providers({ children }) {
    return (
        <SessionProvider>
            <AlertBoxContextProvider>
                <CartContextProvider>
                    <ProgressProvider
                        height='4px'
                        color='#64B5F6'
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
