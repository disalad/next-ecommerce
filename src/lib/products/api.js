'use server';

import axios from 'axios';

export const fetchCategories = async () => {
    const response = await axios.get(
        'https://dummyjson.com/products/categories'
    );
    return response.data;
};
