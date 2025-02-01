import CategoryMenuServer from '@/components/Products/CategoryMenuServer';

function Products() {
    return (
        <div className='py-6 px-4'>
            <h1 className='text-xl font-bold mb-4'>Choose a Category</h1>
            <CategoryMenuServer />
        </div>
    );
}

export default Products;
