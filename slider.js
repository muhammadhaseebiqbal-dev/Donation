// Donation Cards Carousel
document.addEventListener('DOMContentLoaded', function() {
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing page...');
    
    // Test search elements immediately
    setTimeout(function() {
        const searchInput = document.querySelector('.search-input');
        const searchContainer = document.querySelector('.navbar-search');
        console.log('Search test:', {
            input: !!searchInput,
            container: !!searchContainer,
            inputValue: searchInput ? searchInput.placeholder : 'not found'
        });
    }, 100);
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.querySelector('.navbar-search');
    const searchOverlay = document.querySelector('.search-overlay');
    const searchClose = document.querySelector('.search-close');
    
    console.log('Search elements found:', {
        searchInput: !!searchInput,
        searchIcon: !!searchIcon,
        searchContainer: !!searchContainer,
        searchOverlay: !!searchOverlay,
        searchClose: !!searchClose
    });
    
    if (searchInput && searchContainer) {
        // Open search dropdown
        function openSearch() {
            console.log('Opening search dropdown');
            searchContainer.classList.add('active');
            if (searchOverlay) searchOverlay.classList.add('active');
            searchInput.focus();
            document.body.style.overflow = 'hidden';
        }
        
        // Close search dropdown
        function closeSearch() {
            console.log('Closing search dropdown');
            searchContainer.classList.remove('active');
            if (searchOverlay) searchOverlay.classList.remove('active');
            searchInput.blur();
            document.body.style.overflow = '';
        }
        
        // Event listeners
        searchInput.addEventListener('focus', function(e) {
            console.log('Search input focused');
            openSearch();
        });
        
        searchInput.addEventListener('click', function(e) {
            console.log('Search input clicked');
            openSearch();
        });
        
        if (searchIcon) {
            searchIcon.addEventListener('click', function(e) {
                console.log('Search icon clicked');
                openSearch();
            });
        }
        
        if (searchClose) {
            searchClose.addEventListener('click', function(e) {
                console.log('Search close clicked');
                closeSearch();
            });
        }
        
        if (searchOverlay) {
            searchOverlay.addEventListener('click', function(e) {
                console.log('Search overlay clicked');
                closeSearch();
            });
        }
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && searchContainer.classList.contains('active')) {
                console.log('Escape key pressed');
                closeSearch();
            }
        });
    } else {
        console.error('Search elements not found');
    }
    
    // Card button functionality
    const cards = document.querySelectorAll('.donation-card');
    cards.forEach((card, index) => {
        const donateBtn = card.querySelector('.donate-btn-white');
        const learnMoreBtn = card.querySelector('.learn-more-btn');
        
        if (donateBtn) {
            donateBtn.onclick = function(e) {
                e.preventDefault();
                const cardTitle = card.querySelector('.card-title').textContent.trim();
                console.log('Donate clicked for:', cardTitle);
                alert(`Redirecting to donation page for: ${cardTitle}`);
            };
        }
        
        if (learnMoreBtn) {
            learnMoreBtn.onclick = function(e) {
                e.preventDefault();
                const cardTitle = card.querySelector('.card-title').textContent.trim();
                console.log('Learn more clicked for:', cardTitle);
                alert(`Learning more about: ${cardTitle}`);
            };
        }
    });

    // Achievement Carousel
    const achievementLeft = document.querySelector('.achievement-arrow.left');
    const achievementRight = document.querySelector('.achievement-arrow.right');
    const achievementsGrid = document.querySelector('.achievements-grid');

    if (achievementLeft && achievementRight && achievementsGrid) {
        let achievementIndex = 0;
        const achievements = Array.from(achievementsGrid.children);
        const visibleAchievements = 5;

        achievementLeft.addEventListener('click', () => {
            if (achievementIndex > 0) {
                achievementIndex--;
                updateAchievements();
            }
        });

        achievementRight.addEventListener('click', () => {
            if (achievementIndex < achievements.length - visibleAchievements) {
                achievementIndex++;
                updateAchievements();
            }
        });

        function updateAchievements() {
            achievements.forEach((achievement, index) => {
                if (index >= achievementIndex && index < achievementIndex + visibleAchievements) {
                    achievement.style.display = 'block';
                } else {
                    achievement.style.display = 'none';
                }
            });
        }
    }

    // Hero Slider
    const heroDots = document.querySelectorAll('.hero-dots .dot');
    let heroIndex = 2; // Start at slide 3 (index 2)

    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            heroDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            heroIndex = index;
            // Here you would typically change the hero content
        });
    });

    // Auto-rotate hero slider
    setInterval(() => {
        heroIndex = (heroIndex + 1) % heroDots.length;
        heroDots.forEach(d => d.classList.remove('active'));
        heroDots[heroIndex].classList.add('active');
    }, 5000);

    // Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navList) {
        mobileToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileToggle.contains(e.target) && !navList.contains(e.target)) {
                navList.classList.remove('active');
                mobileToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    document.querySelectorAll('.donation-card, .achievement-item, .way-item, .news-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Scroll Down Button
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', () => {
            window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
            });
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('.newsletter-input').value;
            if (email) {
                alert('Thank you for subscribing to our newsletter!');
                newsletterForm.reset();
            }
        });
    }

    // Quick Donate Form
    const quickDonateSubmit = document.querySelector('.quick-donate-submit');
    if (quickDonateSubmit) {
        quickDonateSubmit.addEventListener('click', (e) => {
            e.preventDefault();
            const amount = document.querySelector('.donate-input').value;
            alert(`Thank you for your donation of ${amount}!`);
        });
    }

    // Sticky Header
    const mainHeader = document.querySelector('.main-header');
    if (mainHeader) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 100) {
                mainHeader.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                mainHeader.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
            }
            
            lastScroll = currentScroll;
        });
    }

    // Card Hover Effects
    const donationCards = document.querySelectorAll('.donation-card');
    donationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    }); 
});

// Achievement Number Animation
const achievementNumbers = document.querySelectorAll('.achievement-number');
const animateNumbers = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const text = target.textContent;
            const number = parseFloat(text.replace(/[^\d.]/g, ''));
            const suffix = text.replace(/[\d.\s]/g, '');
            
            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    target.textContent = text;
                    clearInterval(timer);
                } else {
                    target.textContent = current.toFixed(1) + ' ' + suffix;
                }
            }, 30);
            
            observer.unobserve(target);
        }
    });
};

const numberObserver = new IntersectionObserver(animateNumbers, { threshold: 0.5 });
achievementNumbers.forEach(num => numberObserver.observe(num));