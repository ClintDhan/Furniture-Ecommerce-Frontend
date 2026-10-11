import {showCart , showCartCount} from './productsCart.js';


let cartProductContainer = document.querySelector(".cart-product-container");
let totalSpan = document.querySelector(".cart-total-items-span");
let totalLength = document.querySelector(".cart-checkout-length");
let checkoutBtn = document.querySelector(".checkout-btn");
let count = document.querySelector(".cart-count");
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
                    <p class="cart-product-price">₱${unitPrice}</p>
                </div>
                <div class="cart-header-flx-container">
                    <p class="cart-product-quantity">${quantity}</p>
                </div>
                <div class="cart-header-flx-container">
                    <p class="cart-product-total">₱${total}</p>
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

    totalSpan.textContent = `${total}`;
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

})

toggleShowProduct();