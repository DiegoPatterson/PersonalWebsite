document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const menu = document.getElementById('menu');

    menuBtn.addEventListener('click', function () {
        menu.classList.toggle('show');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            menu.classList.remove('show');
        }
    });

    // Adjust menu visibility on window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            menu.classList.remove('show');
        }
    });
});