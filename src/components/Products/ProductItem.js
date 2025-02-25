'use client';

import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { getNewPrice, stringToNumber } from '@/utils/numberUtils';
import { renderStarRating } from '@/utils/productUtils';
import { addToCart, removeFromCart } from '@/utils/cartUtils';
import { useCart } from '@/context/CartContext';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductPage = ({ product }) => {
    const [quantity, setQuantity] = useState(1);
    const [itemExists, setItemExists] = useState(false);
    const { cart, refetchCart } = useCart();
    const { price, discountPercentage } = product;

    const productId = product.id;

    const addToCartHandler = async () => {
        let item;
        if (quantity === 0) {
            item = await removeFromCart(productId);
        } else {
            item = await addToCart(productId, quantity);
        }
        await refetchCart(); // Refetch cart data after updating cart.
        return item;
    };

    useEffect(() => {
        const existingItem = cart?.items?.find(
            (item) => item.productId === productId
        );
        if (existingItem) {
            setItemExists(true);
            setQuantity(stringToNumber(existingItem?.quantity));
            return;
        }
        setItemExists(false);
        setQuantity(1);
    }, [cart]);

    return (
        <div className='flex p-8'>
            {/* Image Slider */}
            <div className='w-1/2 pr-2'>
                <Swiper
                    navigation
                    pagination
                    modules={[Navigation, Pagination]}
                >
                    {product.images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img
                                src={image}
                                alt={product.title}
                                className='w-full h-96 object-cover rounded-lg'
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Product Details */}
            <div className='w-1/2 pl-10'>
                <span className='bg-red-500 text-white px-2 py-1 text-sm rounded'>
                    {product.availabilityStatus}
                </span>
                <h1 className='text-2xl font-semibold mt-4'>{product.title}</h1>
                {/* Star Rating*/}
                {renderStarRating(product.rating)}
                <hr className='mt-4' />
                {/* Price */}
                <p className='text-red-500 text-2xl font-bold mt-4'>
                    ${getNewPrice(price, discountPercentage)}{' '}
                    <span className='text-gray-400 line-through text-xl'>
                        ${product.price}
                    </span>
                </p>
                <hr className='mt-4' />
                {/* Description */}
                <p className='text-gray-500 text-sm mt-4'>
                    {product.description}
                </p>
                {/* Tags */}
                <div className='flex gap-2 mt-4'>
                    {product.tags.map((tag, index) => (
                        <span
                            key={index}
                            className='bg-gray-200 text-gray-700 px-2 py-1 text-sm rounded-full'
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Quantity Selector */}
                <div className='mt-10 flex items-center'>
                    <p className='text-sm font-semibold mr-4'>Quantity:</p>
                    <button
                        onClick={() =>
                            itemExists
                                ? setQuantity(Math.max(0, quantity - 1))
                                : setQuantity(Math.max(1, quantity - 1))
                        }
                        className='border px-3 py-1'
                    >
                        -
                    </button>
                    <span className='mx-4'>{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className='border px-3 py-1'
                    >
                        +
                    </button>
                </div>

                {/* Add to Cart or Update Cart Button */}
                <div className='mt-6' onClick={addToCartHandler}>
                    <button className='bg-yellow-500 px-6 py-2 text-white font-semibold rounded'>
                        {itemExists ? 'UPDATE CART' : 'ADD TO CART'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
