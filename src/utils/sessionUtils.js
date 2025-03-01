export const handleAuthResult = (result, actionType) => {
    if (result.success) {
        if (actionType === 'logout' || actionType === 'deleteAccount') {
            window.location.href = '/login'; // Redirect to login for logout or delete account
        } else {
            window.location.href = '/products'; // Redirect to products for other actions
        }
    } else {
        throw new Error(result.message);
    }
};
