// JavaScript functionality for Al Mustafa Trust website

// Global variables
let zakatCalculationHistory = [];
let donationHistory = [];

// Initialize the website when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
    loadUserData();
});

// Initialize website functionality
function initializeWebsite() {
    setupMobileMenu();
    setupSmoothScrolling();
    setupFormValidation();
    setupAnimations();
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
}

// Smooth Scrolling for navigation links
function setupSmoothScrolling() {
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
}

// Form Validation Setup
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
}

// Validate form inputs
function validateForm(form) {
    let isValid = true;
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });
    
    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value && !isValidEmail(field.value)) {
            showFieldError(field, 'Please enter a valid email address');
            isValid = false;
        }
    });
    
    return isValid;
}

// Show field error
function showFieldError(field, message) {
    clearFieldError(field);
    field.classList.add('error');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Setup scroll animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.donation-card, .stat-item, .news-item, .give-option').forEach(el => {
        observer.observe(el);
    });
}

// Donation functionality
function processDonation() {
    const donationType = document.getElementById('donate-type')?.value || 'Quick Donate';
    const paymentType = document.getElementById('payment-type')?.value || 'Single Payment';
    const amount = document.getElementById('donate-amount')?.value || '40';
    const cause = document.getElementById('donation-cause')?.value || 'General Donation';
    
    if (!amount || parseFloat(amount) <= 0) {
        alert('Please enter a valid donation amount');
        return;
    }
    
    const donation = {
        id: Date.now(),
        type: donationType,
        payment: paymentType,
        amount: parseFloat(amount),
        cause: cause,
        date: new Date().toISOString(),
        status: 'pending'
    };
    
    // Save to donation history
    donationHistory.push(donation);
    saveUserData();
    
    // Show success message
    showDonationModal(donation);
}

// Show donation confirmation modal
function showDonationModal(donation) {
    const modal = createModal(`
        <div class="donation-modal">
            <h3>Thank You for Your Donation!</h3>
            <div class="donation-details">
                <p><strong>Amount:</strong> £${donation.amount.toFixed(2)}</p>
                <p><strong>Cause:</strong> ${donation.cause}</p>
                <p><strong>Type:</strong> ${donation.payment}</p>
            </div>
            <p>Your donation reference: <strong>AMWT${donation.id}</strong></p>
            <p>You will receive a confirmation email shortly.</p>
            <div class="modal-actions">
                <button onclick="closeModal()" class="btn-primary">Continue</button>
                <button onclick="downloadReceipt(${donation.id})" class="btn-secondary">Download Receipt</button>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
}

// Zakat Calculator Functions
function calculateZakat() {
    const cash = parseFloat(document.getElementById('cash')?.value || 0);
    const currentAccount = parseFloat(document.getElementById('current-account')?.value || 0);
    const savingsAccount = parseFloat(document.getElementById('savings-account')?.value || 0);
    const gold = parseFloat(document.getElementById('gold')?.value || 0);
    const silver = parseFloat(document.getElementById('silver')?.value || 0);
    const investments = parseFloat(document.getElementById('investments')?.value || 0);
    const businessAssets = parseFloat(document.getElementById('business-assets')?.value || 0);
    const otherAssets = parseFloat(document.getElementById('other-assets')?.value || 0);
    const debts = parseFloat(document.getElementById('debts')?.value || 0);
    
    const totalAssets = cash + currentAccount + savingsAccount + gold + silver + investments + businessAssets + otherAssets;
    const netAssets = totalAssets - debts;
    const zakatRate = 0.025; // 2.5%
    const zakatDue = netAssets * zakatRate;
    const nisabThreshold = 350; // Using silver nisab as it's lower
    
    // Update results
    document.getElementById('total-assets').textContent = `£${totalAssets.toFixed(2)}`;
    document.getElementById('total-debts').textContent = `£${debts.toFixed(2)}`;
    document.getElementById('net-assets').textContent = `£${netAssets.toFixed(2)}`;
    document.getElementById('zakat-due').textContent = `£${zakatDue.toFixed(2)}`;
    
    // Check nisab status
    const nisabStatus = document.getElementById('nisab-status');
    if (netAssets >= nisabThreshold) {
        nisabStatus.innerHTML = `<div class="nisab-eligible">✓ Your wealth is above the nisab threshold. Zakat is due.</div>`;
        document.querySelector('.donate-zakat-btn').style.display = 'inline-block';
    } else {
        nisabStatus.innerHTML = `<div class="nisab-not-eligible">Your wealth is below the nisab threshold (£${nisabThreshold}). Zakat is not obligatory, but Sadaqah is always welcome.</div>`;
        document.querySelector('.donate-zakat-btn').style.display = 'none';
    }
    
    // Show results
    document.getElementById('zakat-result').style.display = 'block';
    document.getElementById('zakat-result').scrollIntoView({ behavior: 'smooth' });
    
    // Save calculation to history
    const calculation = {
        id: Date.now(),
        date: new Date().toISOString(),
        totalAssets,
        debts,
        netAssets,
        zakatDue,
        isEligible: netAssets >= nisabThreshold
    };
    
    zakatCalculationHistory.push(calculation);
    saveUserData();
}

// Reset Zakat Calculator
function resetCalculator() {
    const inputs = document.querySelectorAll('.zakat-calculator input[type="number"]');
    inputs.forEach(input => input.value = '');
    document.getElementById('zakat-result').style.display = 'none';
}

// Donate Zakat
function donateZakat() {
    const zakatAmount = document.getElementById('zakat-due').textContent.replace('£', '');
    
    if (zakatAmount && parseFloat(zakatAmount) > 0) {
        // Pre-fill donation form with Zakat amount
        if (document.getElementById('donate-amount')) {
            document.getElementById('donate-amount').value = zakatAmount;
        }
        if (document.getElementById('donation-cause')) {
            document.getElementById('donation-cause').value = 'Zakat';
        }
        
        // Redirect to main page donation section
        window.location.href = 'index.html#donate';
    }
}

// Newsletter subscription
function subscribeNewsletter() {
    const email = document.getElementById('newsletter-email')?.value;
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address');
        return;
    }
    
    // Simulate subscription
    showNotification('Thank you for subscribing to our newsletter!', 'success');
    document.getElementById('newsletter-email').value = '';
    
    // Save to local storage
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    if (!subscribers.includes(email)) {
        subscribers.push(email);
        localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    }
}

// Contact form submission
function submitContactForm(event) {
    event.preventDefault();
    const form = event.target;
    
    if (!validateForm(form)) {
        return;
    }
    
    const formData = new FormData(form);
    const contactData = {
        id: Date.now(),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        newsletter: formData.get('newsletter') === 'on',
        date: new Date().toISOString()
    };
    
    // Save contact inquiry
    const contactHistory = JSON.parse(localStorage.getItem('contactHistory') || '[]');
    contactHistory.push(contactData);
    localStorage.setItem('contactHistory', JSON.stringify(contactHistory));
    
    // Show success message
    showNotification('Thank you for your message! We will get back to you within 24 hours.', 'success');
    form.reset();
}

// Utility Functions
function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal" onclick="closeModal()">&times;</span>
            ${content}
        </div>
    `;
    return modal;
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        modal.remove();
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function downloadReceipt(donationId) {
    const donation = donationHistory.find(d => d.id === donationId);
    if (!donation) return;
    
    const receiptContent = `
DONATION RECEIPT
Al Mustafa Welfare Trust
========================

Reference: AMWT${donation.id}
Date: ${new Date(donation.date).toLocaleDateString()}
Amount: £${donation.amount.toFixed(2)}
Cause: ${donation.cause}
Payment Type: ${donation.payment}

Thank you for your generous donation!

Al Mustafa Welfare Trust
110 High Street, Hounslow, TW3 1NA
Charity Registration: 1118492
    `;
    
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `AMWT_Receipt_${donation.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

// Local Storage Functions
function saveUserData() {
    localStorage.setItem('donationHistory', JSON.stringify(donationHistory));
    localStorage.setItem('zakatCalculationHistory', JSON.stringify(zakatCalculationHistory));
}

function loadUserData() {
    donationHistory = JSON.parse(localStorage.getItem('donationHistory') || '[]');
    zakatCalculationHistory = JSON.parse(localStorage.getItem('zakatCalculationHistory') || '[]');
}

// Currency formatting
function formatCurrency(amount, currency = 'GBP') {
    return new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button
window.addEventListener('scroll', function() {
    const scrollBtn = document.getElementById('scroll-to-top');
    if (window.pageYOffset > 300) {
        if (!scrollBtn) {
            const btn = document.createElement('button');
            btn.id = 'scroll-to-top';
            btn.innerHTML = '<i class="fas fa-arrow-up"></i>';
            btn.onclick = scrollToTop;
            btn.className = 'scroll-to-top-btn';
            document.body.appendChild(btn);
        }
    } else if (scrollBtn) {
        scrollBtn.remove();
    }
});

// Print donation history (for admin/user)
function printDonationHistory() {
    if (donationHistory.length === 0) {
        alert('No donation history found.');
        return;
    }
    
    const historyWindow = window.open('', '_blank');
    historyWindow.document.write(`
        <html>
        <head>
            <title>Donation History - Al Mustafa Trust</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #0B7B8A; color: white; }
                .header { text-align: center; margin-bottom: 30px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Al Mustafa Trust</h1>
                <h2>Donation History</h2>
                <p>Generated on: ${new Date().toLocaleDateString()}</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Reference</th>
                        <th>Amount</th>
                        <th>Cause</th>
                        <th>Payment Type</th>
                    </tr>
                </thead>
                <tbody>
                    ${donationHistory.map(donation => `
                        <tr>
                            <td>${new Date(donation.date).toLocaleDateString()}</td>
                            <td>AMWT${donation.id}</td>
                            <td>£${donation.amount.toFixed(2)}</td>
                            <td>${donation.cause}</td>
                            <td>${donation.payment}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </body>
        </html>
    `);
    historyWindow.print();
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('site-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 2) {
                performSearch(query);
            }
        });
    }
}

function performSearch(query) {
    // Simple search implementation
    const searchableElements = document.querySelectorAll('h1, h2, h3, p, a');
    const results = [];
    
    searchableElements.forEach(element => {
        if (element.textContent.toLowerCase().includes(query)) {
            results.push({
                element: element,
                text: element.textContent.trim(),
                type: element.tagName.toLowerCase()
            });
        }
    });
    
    displaySearchResults(results, query);
}

function displaySearchResults(results, query) {
    const resultsContainer = document.getElementById('search-results');
    if (!resultsContainer) return;
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }
    
    resultsContainer.innerHTML = `
        <h3>Search Results for "${query}" (${results.length} found)</h3>
        <ul class="search-results-list">
            ${results.slice(0, 10).map(result => `
                <li onclick="scrollToElement('${result.element.id || result.text.substring(0, 50)}')">
                    <strong>${result.type.toUpperCase()}:</strong> ${result.text.substring(0, 100)}...
                </li>
            `).join('')}
        </ul>
    `;
}

// Initialize all functionality when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeWebsite);
} else {
    initializeWebsite();
}

// Appeals page specific functionality
function donateToAppeal(appealName, amount) {
    const donation = {
        id: Date.now(),
        appeal: appealName,
        amount: amount,
        date: new Date().toISOString(),
        type: 'Appeal Donation'
    };
    
    // Add to donation history
    donationHistory.push(donation);
    saveUserData();
    
    // Save to appeal-specific donations
    const appealDonations = JSON.parse(localStorage.getItem('appealDonations') || '[]');
    appealDonations.push(donation);
    localStorage.setItem('appealDonations', JSON.stringify(appealDonations));
    
    // Show success message with receipt option
    const modal = createModal(`
        <div class="donation-modal">
            <h3>Thank You for Your Donation!</h3>
            <div class="donation-details">
                <p><strong>Appeal:</strong> ${appealName}</p>
                <p><strong>Amount:</strong> £${amount.toFixed(2)}</p>
                <p><strong>Reference:</strong> AMWT${donation.id}</p>
            </div>
            <p>Your donation will help make a real difference to those in need.</p>
            <div class="modal-actions">
                <button onclick="closeModal()" class="btn-primary">Continue</button>
                <button onclick="downloadReceipt(${donation.id})" class="btn-secondary">Download Receipt</button>
                <button onclick="shareAppeal('${appealName}')" class="btn-secondary">Share Appeal</button>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
    
    // Track appeal performance
    trackAppealPerformance(appealName, amount);
}

// Track appeal performance for analytics
function trackAppealPerformance(appealName, amount) {
    const performance = JSON.parse(localStorage.getItem('appealPerformance') || '{}');
    
    if (!performance[appealName]) {
        performance[appealName] = {
            totalDonations: 0,
            totalAmount: 0,
            donationCount: 0
        };
    }
    
    performance[appealName].totalAmount += amount;
    performance[appealName].donationCount += 1;
    performance[appealName].lastDonation = new Date().toISOString();
    
    localStorage.setItem('appealPerformance', JSON.stringify(performance));
}

// Share appeal functionality
function shareAppeal(appealName) {
    if (navigator.share) {
        navigator.share({
            title: `${appealName} - Al Mustafa Trust`,
            text: `Support the ${appealName} with Al Mustafa Trust. Your donation makes a difference!`,
            url: window.location.href
        });
    } else {
        // Fallback for browsers that don't support Web Share API
        const shareText = `Support the ${appealName} with Al Mustafa Trust: ${window.location.href}`;
        navigator.clipboard.writeText(shareText).then(() => {
            showNotification('Appeal link copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Unable to copy link. Please share manually.', 'error');
        });
    }
}

// Generate appeal statistics
function generateAppealStats() {
    const performance = JSON.parse(localStorage.getItem('appealPerformance') || '{}');
    const donations = JSON.parse(localStorage.getItem('appealDonations') || '[]');
    
    const stats = {
        totalRaised: donations.reduce((sum, d) => sum + d.amount, 0),
        totalDonations: donations.length,
        popularAppeal: Object.keys(performance).reduce((a, b) => 
            performance[a]?.donationCount > performance[b]?.donationCount ? a : b, ''),
        recentDonations: donations.slice(-5).reverse()
    };
    
    return stats;
}

// Create donation report
function createDonationReport() {
    const stats = generateAppealStats();
    const reportWindow = window.open('', '_blank');
    
    reportWindow.document.write(`
        <html>
        <head>
            <title>Donation Report - Al Mustafa Trust</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                .header { text-align: center; color: #0B7B8A; margin-bottom: 30px; }
                .stat-box { background: #f8f9fa; padding: 20px; margin: 10px; border-radius: 8px; }
                .recent-donations { margin-top: 30px; }
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background-color: #0B7B8A; color: white; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Al Mustafa Trust</h1>
                <h2>Donation Impact Report</h2>
                <p>Generated on: ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="stat-box">
                <h3>Total Impact</h3>
                <p><strong>Total Raised:</strong> £${stats.totalRaised.toFixed(2)}</p>
                <p><strong>Number of Donations:</strong> ${stats.totalDonations}</p>
                <p><strong>Most Popular Appeal:</strong> ${stats.popularAppeal || 'N/A'}</p>
            </div>
            
            <div class="recent-donations">
                <h3>Recent Donations</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Appeal</th>
                            <th>Amount</th>
                            <th>Reference</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${stats.recentDonations.map(donation => `
                            <tr>
                                <td>${new Date(donation.date).toLocaleDateString()}</td>
                                <td>${donation.appeal}</td>
                                <td>£${donation.amount.toFixed(2)}</td>
                                <td>AMWT${donation.id}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div style="margin-top: 40px; text-align: center; color: #666;">
                <p>Thank you for your generous support!</p>
                <p>Al Mustafa Welfare Trust - Registered Charity No: 1118492</p>
            </div>
        </body>
        </html>
    `);
    
    reportWindow.print();
}

// Enhanced search with appeal filtering
function searchAppeals(query) {
    const appealCards = document.querySelectorAll('.appeal-card');
    const results = [];
    
    appealCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(query.toLowerCase()) || description.includes(query.toLowerCase())) {
            results.push({
                title: card.querySelector('h3').textContent,
                description: card.querySelector('p').textContent,
                element: card
            });
        }
    });
    
    return results;
}

// Auto-save form data for later completion
function autoSaveFormData(formId) {
    const form = document.getElementById(formId);
    if (!form) return;
    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            const formData = {};
            inputs.forEach(inp => {
                if (inp.type === 'checkbox') {
                    formData[inp.name] = inp.checked;
                } else {
                    formData[inp.name] = inp.value;
                }
            });
            localStorage.setItem(`formData_${formId}`, JSON.stringify(formData));
        });
    });
    
    // Load saved data on page load
    const savedData = localStorage.getItem(`formData_${formId}`);
    if (savedData) {
        const formData = JSON.parse(savedData);
        inputs.forEach(input => {
            if (formData[input.name] !== undefined) {
                if (input.type === 'checkbox') {
                    input.checked = formData[input.name];
                } else {
                    input.value = formData[input.name];
                }
            }
        });
    }
}

// Clear saved form data after successful submission
function clearSavedFormData(formId) {
    localStorage.removeItem(`formData_${formId}`);
}

// Enhanced error handling with retry mechanism
function handleApiError(error, retryFunction, maxRetries = 3) {
    let retryCount = 0;
    
    function retry() {
        retryCount++;
        if (retryCount <= maxRetries) {
            setTimeout(() => {
                retryFunction();
            }, 1000 * retryCount); // Exponential backoff
        } else {
            showNotification('Unable to complete request. Please try again later.', 'error');
        }
    }
    
    retry();
}