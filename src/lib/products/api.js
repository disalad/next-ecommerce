'use server';

import axios from 'axios';

export const fetchCategories = async () => {
    const response = await axios.get(
        'https://dummyjson.com/products/categories'
    );
    return response.data;
};

export const fetchProductData = async (id) => {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch product data');
    }
    return res.json();
};
