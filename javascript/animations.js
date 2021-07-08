// Burger menu animation.
// body, burgerMenuBtn and menuOptions declared and defined in main.js
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