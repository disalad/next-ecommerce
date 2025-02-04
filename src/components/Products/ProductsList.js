'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { getRandomInt } from '@/utils/numberUtils';
import { renderStarRating } from '@/utils/renderStarRating';
import axios from 'axios';
import Link from 'next/link';

function ProductsList({ limit = 15, category = null }) {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const hasMore = useRef(true);
    const observerRef = useRef(null);

    const fetchProducts = useCallback(async () => {
        if (!hasMore.current || loading) return;
        const categorySubRoute = category ? `/category/${category}` : '';

        setLoading(true);
        try {
            const res = await axios.get(
                `https://dummyjson.com/products${categorySubRoute}?limit=${limit}&skip=${skip}`
            );
            const newProducts = res.data.products;

            setProducts((prev) => [...prev, ...newProducts]);
            setSkip((prev) => prev + limit);

            if (newProducts.length < limit) {
                hasMore.current = false;
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    }, [skip, loading]);

    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !loading) {
                    fetchProducts();
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(observerRef.current);

        return () => observer.disconnect();
    }, [fetchProducts, loading]);

    const renderStockStatus = (stock, rating) => {
        const stockWarning =
            stock < 10
                ? `ONLY ${stock} LEFT`
                : stock < 25
                ? `ALMOST SOLD OUT`
                : null;
        const topRated = rating > 4 ? 'TOP RATED' : null;

        return (
            <div className='text-sm text-orange-600'>
                {stockWarning || topRated}
            </div>
        );
    };

    return (
        <div className='w-full p-0 mt-6'>
            <div className='mx-auto'>
                <h2 className='text-lg font-bold mb-4'>Products</h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
                    {products.map((product) => (
                        <Link
                            key={product.id + getRandomInt()}
                            href={`/products/${product.id}`}
                            passHref
                        >
                            <div className='p-4 border rounded hover:shadow-lg relative product-card'>
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className='w-full h-36 object-cover rounded'
                                />
                                <div className='text-sm text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis mt-2'>
                                    {product.title}
                                </div>
                                <div className='font-bold text-lg text-gray-900'>
                                    ${product.price}
                                </div>
                                {renderStockStatus(
                                    product.stock,
                                    product.rating
                                )}
                                {renderStarRating(product.rating)}
                            </div>
                        </Link>
                    ))}
                    {loading &&
                        [...Array(limit)].map((_, index) => (
                            <div
                                key={index + getRandomInt()}
                                className='p-4 border rounded animate-pulse product-card'
                            >
                                <div className='h-36 bg-gray-300 rounded'></div>
                                <div className='mt-4 h-4 bg-gray-300 rounded w-3/4'></div>
                                <div className='mt-2 h-3 bg-gray-300 rounded w-2/3'></div>
                                <div className='mt-2 h-3 bg-gray-300 rounded w-1/2'></div>
                            </div>
                        ))}
                </div>
                <div ref={observerRef} className='h-10'></div>
            </div>
        </div>
    );
}

export default ProductsList;
