import { productsList } from "./products.js";

let startIndex = 0;
let initialIndex = 10;


let shopProductsContainer = document.querySelector(".shop-products-container");
let products = productsList();
let filteredProducts = products;
let initialProducts = products.slice(startIndex, initialIndex);
let loadMoreBtn = document.querySelector(".load-more-btn");

const categoryRadios = document.querySelectorAll('input[name="category"]');

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

categoryRadios.forEach(radio => {
    radio.addEventListener("change", () => {

        categoryRadios.forEach(otherRadio => {
            if (otherRadio !== radio) {
                otherRadio.checked = false;
            }
        });


        
        

        startIndex = 0;
        initialIndex = 10;


        if(radio.value === "all") {
            filteredProducts = products;
        }
        else {
            filteredProducts = products.filter(product => {
                return product.category === radio.value;
            });
        }

        let initialProducts = filteredProducts.slice(startIndex, initialIndex);

        shopProductsContainer.innerHTML = initialProducts.map(({id , name, src, price}) => {
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
    });

    
});

loadMoreBtn.addEventListener("click", () => {
    
    startIndex = initialIndex;
    initialIndex += 10;



    initialProducts = filteredProducts.slice(startIndex, initialIndex);
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
    if(initialIndex >= filteredProducts.length) {
        loadMoreBtn.style.display = "none";
    }
    else {
    loadMoreBtn.style.display = "block";
    }
}



