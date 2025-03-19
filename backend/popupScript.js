document.addEventListener('DOMContentLoaded', function () {
    const projectBtns = document.querySelectorAll('.project-btn');

    projectBtns.forEach(btn => {
        btn.addEventListener('mouseover', function () {
            const popup = btn.querySelector('.popup');
            const rect = popup.getBoundingClientRect();
            const viewportWidth = window.innerWidth;

            if (rect.right > viewportWidth) {
                popup.style.left = 'auto';
                popup.style.right = '100%';
                popup.style.transform = 'translateY(0)';
            } else {
                popup.style.left = '100%';
                popup.style.right = 'auto';
                popup.style.transform = 'translateY(0)';
            }
        });
    });
});