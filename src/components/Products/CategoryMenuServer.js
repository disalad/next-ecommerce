import { fetchCategories } from '@/lib/products/api';
import CategoryMenuClient from "./CategoryMenuClient";

const CategoryMenuServer = async () => {
  const categories = await fetchCategories(); // Fetch on the server

  return <CategoryMenuClient categories={categories} />;
};

export default CategoryMenuServer;
