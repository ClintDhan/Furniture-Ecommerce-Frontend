import { productsList } from "./products.js";
import { showCart} from './productsCart.js';
import { getCartCount} from './cartCount.js';
import { showProducts } from "./viewCart.js";

let startIndex = 0;
let initialIndex = 10;

let cart = showCart();
let shopProductsContainer = document.querySelector(".shop-products-container");
let products = productsList();
let filteredProducts = products;
let initialProducts = filteredProducts.slice(startIndex, initialIndex);
let loadMoreBtn = document.querySelector(".load-more-btn");
let toast = document.querySelector(".toast-notification");
let toastExit = document.querySelector(".toast-exit-btn");
let cartModalContainer = document.querySelector(".cart-modal-container");
let cartModalContainerInfo = document.querySelector(".cart-product-modal-info");
let cancelBtn = document.querySelector(".cart-modal-cancel-btn");
let addBtn = document.querySelector(".cart-modal-add-btn");
let toastTimeout;
let id;
let numberInput = 1;



const categoryRadios = document.querySelectorAll('input[name="category"]');

shopProductsContainer.innerHTML += initialProducts.map(({id , name, src, price}) => {
    return `<div id="product-id-${id}" class="shop-products-card">
        <div>
            <img src="${src}" alt="" class="shop-products-img">
        </div>
        
        <div class="shop-card-flx">
            <div>
                <p class="shop-product-title">${name}</p>
                <p class="shop-product-price">₱${price.toLocaleString()}</p>
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
                        <p class="shop-product-price">₱${price.toLocaleString()}</p>
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
                <p class="shop-product-price">₱${price.toLocaleString()}</p>
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



shopProductsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".product-add-cart-container")) {
        numberInput = 1;
        const button = event.target.closest(".product-add-cart-container");


        const productCard = button.parentElement.parentElement;
        id = Number(productCard.id.slice(11));
        
        
       
        const cartProduct = products.find(product => product.id === id);

        // if (existingItem) {
        //     existingItem.quantity++;
        //     existingItem.total = existingItem.quantity * existingItem.unitPrice;
        // }
        // else {
            
        //     const cartProduct = products.find(product => product.id === id);

        //     const item = {
        //         id: id,
        //         quantity: 1,
        //         name: cartProduct.name,
        //         src: cartProduct.src,
        //         unitPrice: cartProduct.price,
        //         total: cartProduct.price
        //     }
        //     cart.push(item);

        // }


        cartModalContainer.classList.toggle("show-add-to-cart-modal");
        cartModalContainerInfo.innerHTML = `<div class="cart-product-modal-info-flx">
                    <img class="cart-product-modal-info-flx-img" src="${cartProduct.src}" alt="${cartProduct.src}">

                    <div>
                        <p class="cart-product-modal-name">${cartProduct.name}</p> <br>
                        <p class="cart-product-modal-price">₱<span>${cartProduct.price.toLocaleString()}</span></p>
                    </div>
                </div>

                <div class="cart-modal-input-container">
                    <div class="cart-modal-minus"><i class="bi bi-dash"></i></div>
                    <div class="cart-modal-input">1</div>
                    <div class="cart-modal-plus"><i class="bi bi-plus"></i></div>
                </div>`
        ;

        let cartMinus = document.querySelector(".cart-modal-minus");
        let cartPlus = document.querySelector(".cart-modal-plus");
        let cartModalInput = document.querySelector(".cart-modal-input");
        numberInput = Number(cartModalInput.textContent);

        cartModalInput.textContent = numberInput;


        cartMinus.addEventListener("click", () => {
            if (numberInput > 1) {
                numberInput--;
                cartModalInput.textContent = numberInput;
            }
        });
        cartPlus.addEventListener("click", () => {
            numberInput++;
            cartModalInput.textContent = numberInput;
        });
    }
});

cancelBtn.addEventListener("click", () => {
    cartModalContainer.classList.toggle("show-add-to-cart-modal");
});

addBtn.addEventListener("click", () => {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity += numberInput;
        existingItem.total = existingItem.quantity * existingItem.unitPrice;
    }
    else {
        
        const cartSpecificProduct = products.find(product => product.id === id);

        const item = {
            id: id,
            quantity: numberInput,
            name: cartSpecificProduct.name,
            src: cartSpecificProduct.src,
            unitPrice: cartSpecificProduct.price,
            total: numberInput * cartSpecificProduct.price
        }
        cart.push(item);

    }

        showAddedToCartToast();
        localStorage.setItem("cart", JSON.stringify(cart));
        getCartCount();
        showProducts();
        cartModalContainer.classList.toggle("show-add-to-cart-modal");
});





toastExit.addEventListener("click", exitToast);

function showAddedToCartToast() {
    toast.classList.add("show-toast");

    clearTimeout(toastTimeout);

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show-toast");
    }, 3000);
}

function exitToast() {
    toast.classList.remove("show-toast");
    clearTimeout(toastTimeout);
}


