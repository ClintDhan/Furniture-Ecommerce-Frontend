import { showCartCount } from './productsCart.js';

let cartCount = document.querySelector(".cart-count");
let mobileCount = document.querySelector(".mobile-cart-count");

export function getCartCount() {
    cartCount.textContent = showCartCount();
    mobileCount.textContent = showCartCount();
}

getCartCount();
