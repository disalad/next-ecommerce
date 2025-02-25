import axios from 'axios';

export const removeFromCart = async (productId) => {
    return (
        await axios.post('/api/cart/remove', {
            productId,
        })
    ).data;
};

export const addToCart = async (productId, quantity) => {
    return (
        await axios.post('/api/cart/add', {
            productId,
            quantity,
        })
    ).data;
};
