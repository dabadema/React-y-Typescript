import type { Guitar, CartItem } from '../types';
import { useState, useEffect } from 'react';

export const useCart = () => {
    const initialCart = (): CartItem[] => {
        const LocalStorageCart = localStorage.getItem('cart');
        return LocalStorageCart ? JSON.parse(LocalStorageCart) : [];
    };

    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    function clearCart() {
        setCart([]);
    }

    function decreaseQuantity(id: Guitar['id']) {
        const updatedCart = cart.map((item) => {
            if (item.id === id && item.quantity > MIN_ITEMS) {
                return {
                    ...item,
                    quantity: item.quantity - 1,
                };
            }
            return item;
        });
        setCart(updatedCart);
    }

    return {
        cart,
        decreaseQuantity,
        clearCart,
    };
};
