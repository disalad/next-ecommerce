import ProductItem from '@/components/Products/ProductItem';

async function fetchProductData(id) {
    const res = await fetch(`https://dummyjson.com/products/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch product data');
    }
    return res.json();
}

async function ProductPage({ params }) {
    const id = (await params)?.id;
    const productData = await fetchProductData(id);

    return (
        <div className='py-6 px-2 sm-md:p-8'>
            <ProductItem product={productData} />
        </div>
    );
}

export default ProductPage;
