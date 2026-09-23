export function showCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    return cart;
}

