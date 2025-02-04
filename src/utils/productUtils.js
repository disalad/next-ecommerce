export const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    const percentage = (rating / 5) * 100;

    return (
        <div className='flex'>
            {[...Array(fullStars)].map((_, i) => (
                <svg
                    key={i}
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
                    key={i}
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


export const renderStockStatus = (stock, rating) => {
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