import { showCartCount } from './productsCart.js' ;

let cartBtn = document.querySelector(".cart");
let viewCartContainer = document.querySelector(".view-cart-container")


function toggleViewCartContainer() {
    viewCartContainer.classList.toggle("show-container");
}

cartBtn.addEventListener("click", () => {
    toggleViewCartContainer();
    showProducts();
});

function showProducts() {
    let cartCount = showCartCount();
    if(cartCount === 0) {
        return viewCartContainer.innerHTML = `
            <p class="cart-no-products">No products added</p>
        `
    }
}

localStorage.removeItem("cart");