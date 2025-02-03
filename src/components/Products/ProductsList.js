'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { getRandomInt } from '@/utils/numberUtils';
import axios from 'axios';
import Link from 'next/link';

const LIMIT = 15;

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [skip, setSkip] = useState(0);
    const [loading, setLoading] = useState(false);
    const hasMore = useRef(true);
    const observerRef = useRef(null);

    const fetchProducts = useCallback(async () => {
        if (!hasMore.current || loading) return;

        setLoading(true);
        try {
            const res = await axios.get(
                `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`
            );
            const newProducts = res.data.products;

            setProducts((prev) => [...prev, ...newProducts]);
            setSkip((prev) => prev + LIMIT);

            if (newProducts.length < LIMIT) {
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

    const renderStarRating = (rating) => {
        const fullStars = Math.floor(rating);
        const emptyStars = 5 - fullStars;
        const percentage = (rating / 5) * 100;

        return (
            <div className='flex'>
                {[...Array(fullStars)].map((_, i) => (
                    <svg
                        key={i + getRandomInt()}
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-4 h-4 text-yellow-500'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                    >
                        <path d='M10 15.27l4.18 2.73-1.64-5.03L18 8.24l-5.19-.42L10 .25 7.19 7.82 2 8.24l4.46 4.73-1.64 5.03L10 15.27z' />
                    </svg>
                ))}
                {[...Array(emptyStars)].map((_, i) => (
                    <svg
                        key={i + getRandomInt()}
                        xmlns='http://www.w3.org/2000/svg'
                        className='w-4 h-4 text-gray-300'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                    >
                        <path d='M10 15.27l4.18 2.73-1.64-5.03L18 8.24l-5.19-.42L10 .25 7.19 7.82 2 8.24l4.46 4.73-1.64 5.03L10 15.27z' />
                    </svg>
                ))}
                <span className='ml-2 text-sm'>{Math.round(percentage)}%</span>
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
                            href={`/product/${product.id}`}
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
                        [...Array(LIMIT)].map((_, index) => (
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
