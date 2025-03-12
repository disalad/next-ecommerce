import { getNewPrice } from '@/utils/numberUtils';

function CheckoutCartItem({ item }) {
    const itemPrice = getNewPrice(item.price, item.discountPercentage);

    return (
        <div
            key={item.productId}
            className='grid grid-cols-5 gap-2 items-center py-4 border-b'
        >
            <div className='col-span-4 flex items-center gap-4'>
                <img
                    src={item.coverImage}
                    alt={item.title}
                    className='w-12 h-12 rounded-full'
                />
                <span className='font-thin'>{item.title}</span>
            </div>
            <div className='col-span-1 flex justify-between items-center font-thin float-right'>
                <span>${(itemPrice * item.quantity).toFixed(2)}</span>
            </div>
        </div>
    );
}

export default CheckoutCartItem;
