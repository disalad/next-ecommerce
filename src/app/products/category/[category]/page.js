import CategoryMenuServer from '@/components/Products/CategoryMenuServer';
import ProductsList from '@/components/Products/ProductsList';

async function ProductCategory({ params }) {
    const category = (await params).category;
    return (
        <div className='py-6 px-2 sm-md:p-8'>
            <h1 className='text-xl font-bold mb-4'>Choose a Category</h1>
            <CategoryMenuServer category={category} />
            <ProductsList category={category} />
        </div>
    );
}

export default ProductCategory;
