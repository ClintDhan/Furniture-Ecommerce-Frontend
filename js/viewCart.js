import { showCartCount , showCart} from './productsCart.js';

let cartProducts = showCart();
let cartBtn = document.querySelector(".cart");
let viewCartContainer = document.querySelector(".view-cart-container")


function toggleViewCartContainer() {
    viewCartContainer.classList.toggle("show-container");
}

cartBtn.addEventListener("click", () => {
    toggleViewCartContainer();
    showProducts();
});

export function showProducts() {
    cartProducts = showCart();
    let cartCount = showCartCount();
    if(cartCount === 0) {
        return viewCartContainer.innerHTML = `
            <p class="cart-no-products">No products added</p>
        `
    }
    else {
        let reversed = [...cartProducts].reverse();

        if(cartProducts.length >= 5) {
            let fiveProducts = reversed.slice(0, 6);

           viewCartContainer.innerHTML = fiveProducts.map(({name , unitPrice, src}) => {
            return `
                <div class="view-cart-card">
                    <div class="view-cart-card-flx">
                        <img class="view-cart-card-img" src="${src}" alt="${name}">
                        <h3 class="view-cart-card-name">${name}</h3>
                    </div>

                    <p class="view-cart-card-price">₱${unitPrice.toLocaleString()}</p>
                </div>            
            `
           }).join("")
        }
        else {
            viewCartContainer.innerHTML = reversed.map(({name , unitPrice, src}) => {
            return `
                <div class="view-cart-card">
                    <div class="view-cart-card-flx">
                        <img class="view-cart-card-img" src="${src}" alt="${name}">
                        <h3 class="view-cart-card-name">${name}</h3>
                    </div>

                    <p class="view-cart-card-price">₱${unitPrice.toLocaleString()}</p>
                </div>            
            `
           }).join("")
        }
        
        viewCartContainer.innerHTML += `<a href="../cart.html" class="view-cart-see-all">SEE ALL</a>`
           
    }
}

// localStorage.removeItem("cart");