import {showCart} from './productsCart.js';


let cartProductContainer = document.querySelector(".cart-product-container");
let cart = showCart();

if(!cart) {
    cartProductContainer.innerHTML = `<h1>No products added</h1>`;
}
else {
    cartProductContainer.innerHTML += cart.map(({id, quantity, name, src, unitPrice, total}) => {
        return`
        <div class="cart-product-info" id="product-cart-${id}">
            <div class="cart-product-info-left">
                <input type="checkbox">
                <img class="cart-product-container-img" src="${src}" alt="${name}">
                <h4>${name}</h4>
            </div>

            <div class="cart-product-info-right">
                <p class="cart-product-price">₱${unitPrice}</p>
                <p class="cart-product-quantity">${quantity}</p>
                <p class="cart-product-total">₱${total}</p>
                <button class="cart-product-delete">DELETE</button>
            </div>
        </div>
        `
    })
}