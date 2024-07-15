import type { CartItem } from '../types';
import { useState, useEffect } from 'react';

export const useCart = () => {
    const initialCart = (): CartItem[] => {
        const LocalStorageCart = localStorage.getItem('cart');
        return LocalStorageCart ? JSON.parse(LocalStorageCart) : [];
    };

    const [cart, setCart] = useState(initialCart);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function clearCart() {
        setCart([]);
    }

    return {
        cart,
        clearCart,
    };
};
