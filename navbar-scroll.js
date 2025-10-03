// Navbar scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar-header');
    const body = document.body;
    let isScrolled = false;

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const navbarHeight = navbar.offsetHeight; // Get the full height of the expanded navbar
        const shouldBeScrolled = scrollTop > navbarHeight; // Trigger after navbar height is scrolled

        if (shouldBeScrolled && !isScrolled) {
            navbar.classList.add('scrolled');
            body.classList.add('scrolled');
            isScrolled = true;
        } else if (!shouldBeScrolled && isScrolled) {
            navbar.classList.remove('scrolled');
            body.classList.remove('scrolled');
            isScrolled = false;
        }
    }

    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Handle initial state
    handleScroll();

    // Dropdown positioning adjustment
    function adjustDropdownPosition() {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        
        dropdowns.forEach(dropdown => {
            const navItem = dropdown.closest('.nav-item');
            
            navItem.addEventListener('mouseenter', () => {
                // Reset positioning
                dropdown.style.left = '';
                dropdown.style.transform = '';
                
                setTimeout(() => {
                    const rect = dropdown.getBoundingClientRect();
                    const viewportWidth = window.innerWidth;
                    
                    // Check if dropdown goes beyond right edge
                    if (rect.right > viewportWidth - 20) {
                        const overflow = rect.right - viewportWidth + 20;
                        dropdown.style.left = `calc(50% - ${overflow}px)`;
                        dropdown.style.transform = 'translateX(-50%)';
                    }
                    
                    // Check if dropdown goes beyond left edge
                    if (rect.left < 20) {
                        dropdown.style.left = '20px';
                        dropdown.style.transform = 'none';
                    }
                }, 10);
            });
        });
    }

    // Initialize dropdown positioning
    adjustDropdownPosition();
    
    // Recalculate on window resize
    window.addEventListener('resize', adjustDropdownPosition);
});