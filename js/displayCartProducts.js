import {showCart , showCartCount} from './productsCart.js';


let cartProductContainer = document.querySelector(".cart-product-container");
let totalSpan = document.querySelector(".cart-total-items-span");
let totalLength = document.querySelector(".cart-checkout-length");
let count = document.querySelector(".cart-count");
let cart = showCart();

if(!cart) {
    toggleShowProduct();
}
else {
    displayCartProducts();
}


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
                <p class="cart-product-price">₱${unitPrice}</p>
                <p class="cart-product-quantity">${quantity}</p>
                <p class="cart-product-total">₱${total}</p>
                <button class="cart-product-delete">DELETE</button>
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

    checkboxes.forEach((checkbox) => {
        const id = Number(checkbox.dataset.id);

        const product = cart.find((product) => product.id === id);

        if (product) {
            total += product.total;
        }
    });

    totalSpan.textContent = `${total}`;
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

toggleShowProduct();