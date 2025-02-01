import CategoryMenuServer from '@/components/Products/CategoryMenuServer';
import ProductList from '@/components/Products/ProductsList';

function Products() {
    return (
        <div className='py-6 px-2 sm-md:p-8'>
            <h1 className='text-xl font-bold mb-4'>Choose a Category</h1>
            <CategoryMenuServer />
            <ProductList />
        </div>
    );
}

export default Products;
