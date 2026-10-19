import {showCart , showCartCount} from './productsCart.js';


let cartProductContainer = document.querySelector(".cart-product-container");
let totalSpan = document.querySelector(".cart-total-items-span");
let totalLength = document.querySelector(".cart-checkout-length");
let checkoutBtn = document.querySelector(".checkout-btn");
let count = document.querySelector(".cart-count");
let mobileCount = document.querySelector(".mobile-cart-count");
let selectedProductCount;

let cart = showCart();

if(!cart) {
    toggleShowProduct();
}
else {
    displayCartProducts();
}

totalLength.textContent = 0;

function displayCartProducts() {
    cartProductContainer.innerHTML = cart.map(({id, quantity, name, src, unitPrice, total}) => {
        return`
        <div class="cart-product-info" id="product-cart-${id}">
            <div class="cart-product-info-left">
                <input type="checkbox" class="cart-product-checkbox" data-id="${id}">
                <img class="cart-product-container-img" src="${src}" alt="${name}">
                <h4>${name}</h4>
            </div>

            <div class="cart-product-info-right">
                <div class="cart-header-flx-container">
                    <p class="cart-product-price">₱${unitPrice.toLocaleString()}</p>
                </div>
                <div class="cart-header-flx-container cart-header-quantity">
                        <div class="cart-minus"><i class="bi bi-chevron-compact-down"></i></div>
                        <p class="cart-product-quantity">${quantity}</p>
                        <div class="cart-plus"><i class="bi bi-chevron-compact-up"></i></div>
                    
                </div>
                <div class="cart-header-flx-container">
                    <p class="cart-product-total">₱${total.toLocaleString()}</p>
                </div>
                <div class="cart-header-flx-container">
                    <button class="cart-product-delete">DELETE</button>
                </div>
            </div>
        </div> 
        `
    }).join("")
}

function toggleShowProduct() {
    if(!showCartCount()) {
        cartProductContainer.innerHTML = `<h1>No products added</h1>`;
    }
    else {
        displayCartProducts();
    }
}

function updateSelectedTotal() {
    const checkboxes = document.querySelectorAll(
        ".cart-product-checkbox:checked"
    );

    let total = 0;

    totalLength.textContent = checkboxes.length;
    selectedProductCount = checkboxes.length;
    checkboxes.forEach((checkbox) => {
        const id = Number(checkbox.dataset.id);

        const product = cart.find((product) => product.id === id);

        if (product) {
            total += product.total;
        }
    });

    totalSpan.textContent = `${total.toLocaleString()}`;
    console.log(selectedProductCount);
}

cartProductContainer.addEventListener("change", (event) => {
    if (event.target.classList.contains("cart-product-checkbox")) {
        updateSelectedTotal();
    }
});

cartProductContainer.addEventListener("click", (e) => {
    const deleteBtn = e.target.closest(".cart-product-delete");

    if(deleteBtn) {
        const productId = deleteBtn.closest(".cart-product-info").id;
        const id = Number(productId.slice(13));
        if(confirm(("Are you sure you want to delete this product in your cart?"))) {
            cart = cart.filter((product) => product.id !== id);
            
            localStorage.setItem("cart", JSON.stringify(cart));
            toggleShowProduct();
            updateSelectedTotal();
            count.textContent = showCartCount();
            mobileCount.textContent = showCartCount();

        }
    }
});

function proceedtoCheckout() {
    const checkboxes = document.querySelectorAll(
        ".cart-product-checkbox:checked"
    );

    let selectedProducts = [];

    checkboxes.forEach((checkbox) => {
        const id = Number(checkbox.dataset.id);
        let product = cart.find((product) => product.id === id);
        selectedProducts.push(product);
    });

    localStorage.setItem("checkoutProducts", JSON.stringify(selectedProducts));
}

checkoutBtn.addEventListener("click", (e) => {
    if(!selectedProductCount) {
        alert("No products selected");
        e.preventDefault();
        return;
    }

    proceedtoCheckout();

});



cartProductContainer.addEventListener("click", (event) => {

   

    const minus = event.target.closest(".cart-minus");
    const plus = event.target.closest(".cart-plus");

    if (!minus && !plus) return;

    if(minus) {
        
        let parent = minus.parentElement.parentElement.parentElement;
         let cartProductQuantity = parent.querySelector(".cart-product-quantity");
        let cartProductTotal = parent.querySelector(".cart-product-total");
        let id = Number(parent.id.slice(13));

        let product = cart.find(item => item.id === id);

        if(product.quantity > 1) {
         product.quantity--;
         product.total = product.quantity * product.unitPrice;
        cartProductQuantity.textContent = product.quantity;
        cartProductTotal.textContent = `₱${product.total.toLocaleString()}`;
        }
        
    }

    if(plus) {
        
        let parent = plus.parentElement.parentElement.parentElement;
        let cartProductQuantity = parent.querySelector(".cart-product-quantity");
        let cartProductTotal = parent.querySelector(".cart-product-total");
        let id = Number(parent.id.slice(13));

        let product = cart.find(item => item.id === id);
         product.quantity++;
         product.total = product.quantity * product.unitPrice;
        cartProductQuantity.textContent = product.quantity;
        cartProductTotal.textContent = `₱${product.total.toLocaleString()}`;

    
    }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateSelectedTotal();

});

toggleShowProduct();