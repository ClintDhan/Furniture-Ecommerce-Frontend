import { showCart } from './productsCart';
import { productsList } from './products';


let products = productsList();
let cart = showCart();

let addToCartBtn = document.querySelectorAll(".product-add-cart-container");

addToCartBtn.forEach(btn => {
    let id = btn.parentElement.id;
    console.log(id);
})