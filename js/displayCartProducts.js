import {showCart} from './productsCart.js';


let cartProductContainer = document.querySelector(".cart-product-container");
let totalSpan = document.querySelector(".cart-total-items-span");
let totalLength = document.querySelector(".cart-checkout-length");
let cart = showCart();

if(!cart) {
    cartProductContainer.innerHTML = `<h1>No products added</h1>`;
}
else {
    cartProductContainer.innerHTML += cart.map(({id, quantity, name, src, unitPrice, total}) => {
        return`
        <div class="cart-product-info" id="product-cart-${id}">
            <div class="cart-product-info-left">
                <input type="checkbox" class="cart-product-checkbox" data-id="${id}">
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
    }).join("")
}

cartProductContainer.addEventListener("change", (event) => {
    if (event.target.classList.contains("cart-product-checkbox")) {
        
        const checkedBoxes = cartProductContainer.querySelectorAll(
            ".cart-product-checkbox:checked"
        );

        totalLength.textContent = checkedBoxes.length;

        let total = 0;

        checkedBoxes.forEach(checkbox => {
            const id = Number(checkbox.dataset.id);
            const product = cart.find(product => product.id === id);
            
            total += product.total;
        });

        totalSpan.textContent = `${total}`;
    }
});