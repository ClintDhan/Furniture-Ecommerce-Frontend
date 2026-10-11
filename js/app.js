let modal = document.querySelector(".modal-container");
let burger = document.querySelector(".menu");
let exitBtn = document.querySelector(".modal-exit");


burger.addEventListener("click", () => {
    modal.classList.toggle("show-modal");
})

exitBtn.addEventListener("click", () => {
    modal.classList.remove("show-modal");
})