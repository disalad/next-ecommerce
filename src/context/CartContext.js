// Code to handle cart data on client side.
'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useAlertBox } from './AlertBoxContext';
import axios from 'axios';

const CartContext = createContext();

export function CartContextProvider({ children }) {
    const [cart, setCart] = useState({});
    const [loading, setLoading] = useState(false);
    const { showAlert } = useAlertBox();
    const { data: session, status } = useSession();

    const fetchCartData = async () => {
        if (status === 'authenticated') {
            try {
                setLoading(true);
                const response = await axios.get('/api/cart');
                setCart(response.data);
            } catch (error) {
                showAlert('Failed fetching cart data.');
            } finally {
                setLoading(false);
            }
        } else {
            setCart({});
        }
    };

    useEffect(() => {
        fetchCartData();
    }, [status]);

    return (
        <CartContext.Provider
            value={{ cart, refetchCart: fetchCartData, cartLoading: loading }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}
