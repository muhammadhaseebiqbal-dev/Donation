// Navbar scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar-header');
    let isScrolled = false;
    let scrollTimeout;

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const shouldBeScrolled = scrollTop > 200; // Trigger after 200px scroll

        if (shouldBeScrolled && !isScrolled) {
            // Add delay before applying scrolled state
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                navbar.classList.add('scrolled');
                isScrolled = true;
            }, 200); // 200ms delay
        } else if (!shouldBeScrolled && isScrolled) {
            // Remove scrolled state immediately when back to top
            clearTimeout(scrollTimeout);
            navbar.classList.remove('scrolled');
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