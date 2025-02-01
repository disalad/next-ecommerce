'use server';

import axios from 'axios';

export const fetchCategories = async () => {
    const response = await axios.get(
        'https://dummyjson.com/products/category-list'
    );
    return response.data;
};
