import ProductItem from '@/components/Products/ProductItem';
import { fetchProductData } from '@/lib/products/api';

async function ProductPage({ params }) {
    const id = (await params)?.id;
    const productData = await fetchProductData(id);

    return (
        <div className='py-6 px-2 sm-md:p-8 container mx-auto min-h-[70vh]'>
            <ProductItem product={productData} />
        </div>
    );
}

export default ProductPage;
