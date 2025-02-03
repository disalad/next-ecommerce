'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CategoryMenuClient = ({ categories }) => {
    const router = useRouter();
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollAmount = clientWidth * 0.6; // Scroll by 60% of container width
            scrollRef.current.scrollTo({
                left:
                    direction === 'left'
                        ? scrollLeft - scrollAmount
                        : scrollLeft + scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    const startDrag = (e) => {
        setIsDragging(true);
        setStartX(e.pageX || e.touches[0].pageX);
        setScrollLeft(scrollRef.current.scrollLeft);
    };

    const onDrag = (e) => {
        if (!isDragging || !scrollRef.current) return;
        const x = e.pageX || e.touches[0].pageX;
        const walk = (x - startX) * 1.5; // Multiplier for smoother drag
        scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const stopDrag = () => {
        setIsDragging(false);
    };

    const handleCategoryClick = (category) => {
        router.push(`/products/category/${category.slug}`);
    };

    return (
        <div className='relative w-full'>
            {/* Left Arrow */}
            <button
                onClick={() => scroll('left')}
                className='absolute left-0 z-10 p-2 bg-white border border-gray-300 rounded-full shadow-md -translate-y-1/2 top-1/2'
            >
                <ChevronLeft size={20} />
            </button>

            {/* Scrollable Category List */}
            <div
                ref={scrollRef}
                className='flex space-x-3 overflow-x-auto hide-scrollbar scroll-smooth px-10 select-none cursor-pointer'
                onMouseDown={startDrag}
                onMouseMove={onDrag}
                onMouseUp={stopDrag}
                onMouseLeave={stopDrag}
                onTouchStart={startDrag}
                onTouchMove={onDrag}
                onTouchEnd={stopDrag}
            >
                {categories.map((category) => (
                    <div
                        key={category.slug}
                        onClick={() => handleCategoryClick(category)}
                        className='px-4 py-2 whitespace-nowrap rounded-full border border-gray-300 text-black hover:bg-gray-200'
                    >
                        {category.name}
                    </div>
                ))}
            </div>

            {/* Right Arrow */}
            <button
                onClick={() => scroll('right')}
                className='absolute right-0 z-10 p-2 bg-white border border-gray-300 rounded-full shadow-md -translate-y-1/2 top-1/2'
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

export default CategoryMenuClient;
