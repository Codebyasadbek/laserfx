const menuBtn = document.querySelector('.open-dropdownBtn');
const menuDropdown = document.querySelector('.menu-dropdown');

menuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    menuDropdown.classList.toggle('active');
    menuBtn.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!menuDropdown.contains(e.target) && !menuBtn.contains(e.target)) {
        menuDropdown.classList.remove('active');
        menuBtn.classList.remove('active');
    }
});


const servicesListItems = document.querySelectorAll('.services__lists .item');
const servicesRightItems = document.querySelectorAll('.services__right .item');

if (servicesListItems.length > 0 && servicesRightItems.length > 0) {
    servicesListItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            servicesListItems.forEach(el => el.classList.remove('active'));
            servicesRightItems.forEach(el => el.classList.remove('active'));

            item.classList.add('active');
            if (servicesRightItems[index]) {
                servicesRightItems[index].classList.add('active');
            }
        });
    });
}

// Back to Top functionality
const backToTopBtn = document.querySelector('.back-icon');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

