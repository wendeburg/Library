const burgerMenuBtn = document.querySelector('.burger-menu');
const menuOptions = document.querySelector('.mobile-menu');
const body = document.querySelector('body');
let burgerMenuOpen = false;

burgerMenuBtn.addEventListener('click', () => {
    if (!burgerMenuOpen) {
        burgerMenuOpen = true;
        
    }
    else {
        burgerMenuOpen = false;
    }

    body.classList.toggle('hidden-overflow');
    menuOptions.classList.toggle('show-menu');
    burgerMenuBtn.classList.toggle('open');
})