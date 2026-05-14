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


// Services Tabs Logic
const servicesListItems = document.querySelectorAll('.services__lists .item');
const servicesRightItems = document.querySelectorAll('.services__right .item');

if (servicesListItems.length > 0 && servicesRightItems.length > 0) {
    servicesListItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all list items and right items
            servicesListItems.forEach(el => el.classList.remove('active'));
            servicesRightItems.forEach(el => el.classList.remove('active'));

            // Add active class to clicked item and corresponding right item
            item.classList.add('active');
            if (servicesRightItems[index]) {
                servicesRightItems[index].classList.add('active');
            }
        });
    });
}
