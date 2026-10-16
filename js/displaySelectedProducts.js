import {showCart} from './productsCart.js';


function showSelectedProducts() {
    let products = JSON.parse(localStorage.getItem("checkoutProducts"));

    return products;
}

let selectedProducts = showSelectedProducts();
let checkOutProductsContainer = document.querySelector(".checkout-products-info-container");
let merchSubtotal = document.querySelector(".merch-subtotal");
let shipSubtotal = document.querySelector(".ship-subtotal");
let totalPayment = document.querySelector(".total-payment");
let placeOrderBtn = document.querySelector(".place-order-btn");
let cart = showCart();


let merchSubtotalValue = selectedProducts.reduce((total , {unitPrice , quantity}) => {
    return total + (unitPrice * quantity);
}, 0);

let shipmentValue = merchSubtotalValue * 0.03;


checkOutProductsContainer.innerHTML = selectedProducts.map(({id, name, quantity, src, unitPrice}) => {
    return`
        <div class="checkout-products-info" id="checkout-product-${id}">
            <div class="checkout-products-info-flx">
                <img src="${src}" alt="${name}">
                <h4>${name}</h4>
            </div>
            
            <div class="checkout-products-price-flx">
                <div class="checkout-products-header-p-container">
                    <p class="checkout-products-price">₱${unitPrice.toLocaleString()}</p>
                </div>

                <div class="checkout-products-header-p-container">
                    <p class="checkout-products-quantity">${quantity}</p>
                </div>

                <div class="checkout-products-header-p-container">
                    <p class="checkout-products-subtotal subtotal">₱${(quantity * unitPrice).toLocaleString()}</p>
                </div>
            </div>
        </div>
    `
}).join("");


merchSubtotal.textContent = `₱${merchSubtotalValue.toLocaleString()}`;
shipSubtotal.textContent = `₱${shipmentValue.toLocaleString()}`;
totalPayment.textContent = `₱${(merchSubtotalValue + shipmentValue).toLocaleString()}`;

placeOrderBtn.addEventListener("click", () => {
    if(confirm(`Continue to place order(s)?`)) {
        alert(`Order Placed! Kindly Allow 14days!`);
        localStorage.removeItem("checkoutProducts");
        removePlacedOrdersFromCart();
        window.location.href = "../shop.html";
    };
});


function removePlacedOrdersFromCart() {
    cart = cart.filter((cartProduct) => {
    return !selectedProducts.some(({ id }) => id === cartProduct.id);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
}







