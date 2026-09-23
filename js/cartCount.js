import { showCartCount } from './productsCart.js';

let cartCount = document.querySelector(".cart-count");

export function getCartCount() {
    cartCount.textContent = showCartCount();
}

getCartCount();
