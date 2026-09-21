import { productsList } from "./products.js";

let startIndex = 0;
let initialIndex = 10;

let shopProductsContainer = document.querySelector(".shop-products-container");
let products = productsList();
let initialProducts = products.slice(startIndex, initialIndex);
let loadMoreBtn = document.querySelector(".load-more-btn");

shopProductsContainer.innerHTML += initialProducts.map(({id , name, src, price}) => {
    return `<div id="product-id-${id}" class="shop-products-card">
        <div>
            <img src="${src}" alt="" class="shop-products-img">
        </div>
        
        <div class="shop-card-flx">
            <div>
                <p class="shop-product-title">${name}</p>
                <p class="shop-product-price">₱${price}</p>
            </div>

            <div class="product-add-cart-container">
                <i class="bi bi-cart-plus"></i>
            </div>
        </div>
    </div>
    `
}).join("");

loadMoreBtn.addEventListener("click", () => {
    
    startIndex = initialIndex;
    initialIndex += 10;

    initialProducts = products.slice(startIndex, initialIndex);
    shopProductsContainer.innerHTML += initialProducts.map(({id , name, src, price}) => {
    return `<div id="product-id-${id}" class="shop-products-card">
        <div>
            <img src="${src}" alt="" class="shop-products-img">
        </div>
        
        <div class="shop-card-flx">
            <div>
                <p class="shop-product-title">${name}</p>
                <p class="shop-product-price">₱${price}</p>
            </div>

            <div class="product-add-cart-container">
                <i class="bi bi-cart-plus"></i>
            </div>
        </div>
    </div>
    `
}).join("");
    checkLastProduct();
})


function checkLastProduct() {
    if(initialIndex >= products.length) {
        loadMoreBtn.disabled = true;
        loadMoreBtn.style.pointerEvents = 'none'; 
        loadMoreBtn.style.backgroundColor = "#959ba3";
    }
}



