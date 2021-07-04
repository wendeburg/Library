const burgerMenuBtn = document.querySelector('.burger-menu');
let burgerMenuOpen = false;

burgerMenuBtn.addEventListener('click', () => {
    if (!burgerMenuOpen) {
        burgerMenuOpen = true;
    }
    else {
        burgerMenuOpen = false;
    }

    burgerMenuBtn.classList.toggle('open');
})