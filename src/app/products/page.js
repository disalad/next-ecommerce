import CategoryMenuServer from '@/components/Products/CategoryMenuServer';
import ProductsList from '@/components/Products/ProductsList';

function Products() {
    return (
        <div className='py-6 px-2 sm-md:p-8 container mx-auto'>
            <h1 className='text-xl font-bold mb-4'>Choose a Category</h1>
            <CategoryMenuServer />
            <ProductsList />
        </div>
    );
}

export default Products;
