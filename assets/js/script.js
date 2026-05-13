        const menuBtn = document.querySelector('.menu-btn');
        const menuDropdown = document.querySelector('.menu-dropdown');

        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            menuDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!menuDropdown.contains(e.target) && !menuBtn.contains(e.target)) {
                menuDropdown.classList.remove('active');
            }
        });