export const getRandomInt = () => {
    const random = Number(Math.floor(Math.random() * 1000000));
    return random;
};

export const getNewPrice = (originalPrice, discountPercentage) => {
    const price = Number(originalPrice);
    const discount = Number(discountPercentage);

    if (discount < 0 || discount > 100) {
        return NaN;
    }
    const discountAmount = price * (discount / 100);
    const newPrice = price - discountAmount;

    return parseFloat(newPrice.toFixed(2));
};
