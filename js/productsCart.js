export function showCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    return cart;
}

export function showCartCount() {
    let cart = showCart();

    if(cart.length === 0) {
        return 0;
    }

    return cart.reduce((total, item) => item.quantity + total , 0);
}