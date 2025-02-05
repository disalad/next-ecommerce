import Cart from '@/models/Cart';
import dbConnect from '@/lib/db/mongodb';

// Implement logic to retrieve cart items from MongoDB
export async function getCartItems(userId) {
    await dbConnect();
    let cart = await Cart.findOne({ userId });
    return cart;
}

// Implement logic to add a new cart item into MongoDB
export async function addItemToCart(newItem, userId) {
    await dbConnect();

    const cart = await Cart.findOne({ userId });
    if (cart) {
        // Check if the product already exists in the cart
        const existingItemIndex = cart.items.findIndex(
            (item) => item.productId.toString() === newItem.productId.toString()
        );

        if (existingItemIndex !== -1) {
            // Product exists, update the quantity
            cart.items[existingItemIndex].quantity = newItem.quantity;
        } else {
            // Product doesn't exist, add new item to the cart
            cart.items.push({
                productId: newItem.productId,
                quantity: newItem.quantity,
            });
        }

        await cart.save();
        console.log('Updated Cart:', cart);
        return cart;
    } else {
        // If no cart exists for the user, create a new cart
        const newCart = new Cart({
            userId,
            items: [
                {
                    productId: newItem.productId,
                    quantity: newItem.quantity,
                },
            ],
        });

        await newCart.save();
        console.log('Created New Cart:', newCart);
        return newCart;
    }
}

export async function getCartItem(itemId) {
    // Implement logic to fetch a single cart item by ID
}

export async function updateCartItem(itemId, updatedData) {
    // Implement logic to update a specific cart item
}

export async function removeCartItem(itemId) {
    // Implement logic to remove a cart item
}
