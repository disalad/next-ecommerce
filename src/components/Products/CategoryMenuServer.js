import { fetchCategories } from '@/lib/products/api';
import CategoryMenuClient from './CategoryMenuClient';

const CategoryMenuServer = async ({ category: currentCategory }) => {
    const categories = await fetchCategories(); // Fetch on the server

    return (
        <CategoryMenuClient
            categories={categories}
            currentCategory={currentCategory}
        />
    );
};

export default CategoryMenuServer;
