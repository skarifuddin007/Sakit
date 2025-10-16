// TaskFlow AI - Enhanced JavaScript with Dark Theme Support

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileNavigation();
    initSmoothNavigation();
    initScrollEffects();
    initContactForm();
    initCTAButtons();
    initFAQToggle();
    initAnimationTriggers();
    initThemeEffects();
    
    // Set initial section
    const hash = window.location.hash.substring(1) || 'home';
    showSection(hash);
    updateActiveNavLink(hash);
});

// Mobile Navigation Toggle
function initMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const isActive = hamburger.classList.contains('active');
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Prevent background scrolling when mobile menu is open
            if (!isActive) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Close mobile menu when clicking on a nav link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || hamburger.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
            }
        });
    }
}

// Smooth Navigation Between Sections
function initSmoothNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const footerLinks = document.querySelectorAll('.footer a[href^="#"]');
    const allLinks = [...navLinks, ...footerLinks];

    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Update URL without triggering popstate
                history.pushState(null, null, '#' + targetId);
                
                // Show target section
                showSection(targetId);
                updateActiveNavLink(targetId);
                
                // Smooth scroll to top
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });

                // Add fade in animation
                targetSection.classList.add('fade-in-up');
            }
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        const hash = window.location.hash.substring(1) || 'home';
        showSection(hash);
        updateActiveNavLink(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Show specific section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const targetSection = document.getElementById(sectionId);
    
    if (targetSection) {
        sections.forEach(section => {
            section.classList.remove('active', 'fade-in-up');
        });
        
        targetSection.classList.add('active');
        
        // Trigger entrance animation after a brief delay
        setTimeout(() => {
            targetSection.classList.add('fade-in-up');
        }, 50);
    }
}

// Update active navigation link
function updateActiveNavLink(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + activeId) {
            link.classList.add('active');
        }
    });
}

// Enhanced Scroll Effects
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    let ticking = false;

    function updateNavbar() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll (optional enhancement)
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
        ticking = false;
    }

    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
}

// Enhanced Contact Form Handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const formInputs = contactForm.querySelectorAll('input, textarea');
            const originalBtnContent = submitBtn.innerHTML;
            
            // Validate form
            let isValid = true;
            const errors = [];
            
            formInputs.forEach(input => {
                const value = input.value.trim();
                
                // Clear previous error states
                input.style.borderColor = '';
                input.classList.remove('error');
                
                if (input.hasAttribute('required') && !value) {
                    isValid = false;
                    errors.push(`${input.name} is required`);
                    input.style.borderColor = '#ef4444';
                    input.classList.add('error');
                } else if (input.type === 'email' && value && !isValidEmail(value)) {
                    isValid = false;
                    errors.push('Please enter a valid email address');
                    input.style.borderColor = '#ef4444';
                    input.classList.add('error');
                }
            });

            if (!isValid) {
                showNotification('Please fix the following errors: ' + errors.join(', '), 'error');
                // Focus on first error field
                const firstError = contactForm.querySelector('.error');
                if (firstError) firstError.focus();
                return;
            }

            // Show loading state
            submitBtn.innerHTML = `
                <div class="loading-spinner"></div>
                <span>Sending...</span>
            `;
            submitBtn.disabled = true;
            
            // Simulate form submission with realistic delay
            setTimeout(() => {
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());
                
                // Log form data (in real app, this would be sent to server)
                console.log('Contact form submission:', data);
                
                showNotification('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
                contactForm.reset();
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
                
                // Add success animation
                contactForm.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    contactForm.style.transform = '';
                }, 200);
                
            }, 2000);
        });

        // Real-time validation feedback
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
                this.classList.remove('error');
            });

            input.addEventListener('blur', function() {
                const value = this.value.trim();
                if (this.type === 'email' && value && !isValidEmail(value)) {
                    this.style.borderColor = '#ef4444';
                    this.classList.add('error');
                } else if (this.hasAttribute('required') && !value) {
                    this.style.borderColor = '#ef4444';
                    this.classList.add('error');
                }
            });
        });
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced CTA Button Handling
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button, .btn--primary');
    
    ctaButtons.forEach(button => {
        // Add ripple effect
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        button.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Get Started') || buttonText.includes('Start') && buttonText.includes('Trial')) {
                e.preventDefault();
                showNotification('🚀 Free trial signup coming soon! Contact us for early access.', 'info');
                
                // Optional: scroll to contact section
                setTimeout(() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                        showSection('contact');
                        updateActiveNavLink('contact');
                        history.pushState(null, null, '#contact');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                }, 2000);
                
            } else if (buttonText.includes('Contact Sales')) {
                e.preventDefault();
                showSection('contact');
                updateActiveNavLink('contact');
                history.pushState(null, null, '#contact');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}

// FAQ Toggle Functionality
function initFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                        }
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    answer.style.maxHeight = '0';
                } else {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });
}

// Animation Triggers
function initAnimationTriggers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Stagger animations for grid items
                if (entry.target.classList.contains('feature-card') || 
                    entry.target.classList.contains('pricing-card') ||
                    entry.target.classList.contains('description-card')) {
                    
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.animationDelay = (index * 100) + 'ms';
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.feature-card, .pricing-card, .description-card, .contact-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Theme Effects and Enhancements
function initThemeEffects() {
    // Add dynamic gradient effects to certain elements
    const gradientElements = document.querySelectorAll('.btn--primary, .feature-icon, .description-icon');
    
    gradientElements.forEach(element => {
        element.addEventListener('mousemove', function(e) {
            const rect = element.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            element.style.background = `linear-gradient(135deg, 
                hsl(${190 + x * 0.5}, 100%, ${50 + y * 0.3}%) 0%, 
                hsl(${250 - x * 0.3}, 80%, ${60 + y * 0.2}%) 100%)`;
        });
        
        element.addEventListener('mouseleave', function() {
            element.style.background = '';
        });
    });

    // Add parallax effect to floating circles
    const floatingCircles = document.querySelectorAll('.floating-circle');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        floatingCircles.forEach((circle, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            circle.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // Add glitch effect to main title on hover (subtle)
    const mainTitle = document.querySelector('.hero h1');
    if (mainTitle) {
        mainTitle.addEventListener('mouseenter', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'glitch 0.3s ease-in-out';
            }, 10);
        });
    }
}

// Enhanced Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    });

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    const icon = getNotificationIcon(type);
    
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">${icon}</div>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()" aria-label="Close notification">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2"/>
                </svg>
            </button>
        </div>
    `;

    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                max-width: 400px;
                background: rgba(17, 17, 17, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 16px 20px;
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
                z-index: 10000;
                animation: slideInRight 0.4s ease-out;
                font-family: var(--font-family-base);
                color: white;
            }
            
            .notification--success {
                border-left: 4px solid #00d4ff;
            }
            
            .notification--error {
                border-left: 4px solid #ef4444;
            }
            
            .notification--info {
                border-left: 4px solid #6366f1;
            }
            
            .notification-content {
                display: flex;
                align-items: flex-start;
                gap: 12px;
            }
            
            .notification-icon {
                flex-shrink: 0;
                width: 20px;
                height: 20px;
                margin-top: 2px;
            }
            
            .notification-message {
                flex: 1;
                font-size: 14px;
                line-height: 1.5;
            }
            
            .notification-close {
                flex-shrink: 0;
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.7);
                cursor: pointer;
                padding: 2px;
                border-radius: 4px;
                transition: all 0.2s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                color: white;
                background: rgba(255, 255, 255, 0.1);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
            
            .loading-spinner {
                width: 20px;
                height: 20px;
                border: 2px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: white;
                animation: spin 1s ease-in-out infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: rippleEffect 0.6s linear;
                pointer-events: none;
            }
            
            @keyframes rippleEffect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes glitch {
                0%, 100% { transform: translate(0); }
                20% { transform: translate(-1px, 1px); }
                40% { transform: translate(-1px, -1px); }
                60% { transform: translate(1px, 1px); }
                80% { transform: translate(1px, -1px); }
            }
            
            @media (max-width: 480px) {
                .notification {
                    right: 12px;
                    left: 12px;
                    max-width: none;
                    top: 90px;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // Add to page
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Get notification icon based on type
function getNotificationIcon(type) {
    const icons = {
        success: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#00d4ff" stroke-width="2"/>
                    <path d="m9 12 2 2 4-4" stroke="#00d4ff" stroke-width="2"/>
                  </svg>`,
        error: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#ef4444" stroke-width="2"/>
                  <path d="m15 9-6 6m0-6 6 6" stroke="#ef4444" stroke-width="2"/>
                </svg>`,
        info: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                 <circle cx="12" cy="12" r="10" stroke="#6366f1" stroke-width="2"/>
                 <path d="M12 16v-4M12 8h.01" stroke="#6366f1" stroke-width="2"/>
               </svg>`
    };
    return icons[type] || icons.info;
}

// Keyboard Navigation Enhancement
document.addEventListener('keydown', function(e) {
    // ESC key functionality
    if (e.key === 'Escape') {
        // Close mobile menu
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Close notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());

        // Close FAQ items
        const activeFAQs = document.querySelectorAll('.faq-item.active');
        activeFAQs.forEach(item => {
            item.classList.remove('active');
            const answer = item.querySelector('.faq-answer');
            if (answer) answer.style.maxHeight = '0';
        });
    }

    // Arrow key navigation for FAQ
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('faq-question')) {
            const faqItems = Array.from(document.querySelectorAll('.faq-question'));
            const currentIndex = faqItems.indexOf(focusedElement);
            
            let nextIndex;
            if (e.key === 'ArrowDown') {
                nextIndex = (currentIndex + 1) % faqItems.length;
            } else {
                nextIndex = (currentIndex - 1 + faqItems.length) % faqItems.length;
            }
            
            faqItems[nextIndex].focus();
            e.preventDefault();
        }
    }
});

// Performance Optimization: Lazy load images
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
initLazyLoading();

// Export functions for potential external use
window.TaskFlowAI = {
    showSection,
    updateActiveNavLink,
    showNotification,
    initThemeEffects
};

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // In a real implementation, you would register a service worker here
        console.log('TaskFlow AI: Ready for PWA enhancement');
    });
}

// Analytics placeholder (replace with actual analytics code)
function trackEvent(eventName, properties = {}) {
    console.log('Analytics Event:', eventName, properties);
    // In production, replace with actual analytics tracking
    // Example: gtag('event', eventName, properties);
}

// Track key user interactions
document.addEventListener('click', function(e) {
    const target = e.target.closest('button, a');
    if (target) {
        const text = target.textContent.trim();
        if (text.includes('Get Started') || text.includes('Trial')) {
            trackEvent('cta_click', { button_text: text, section: getCurrentSection() });
        } else if (target.classList.contains('nav-link')) {
            trackEvent('navigation_click', { destination: target.getAttribute('href') });
        }
    }
});

function getCurrentSection() {
    const activeSection = document.querySelector('.section.active');
    return activeSection ? activeSection.id : 'unknown';
}

// Initialize on DOM ready
console.log('TaskFlow AI: Dark theme application loaded successfully ✨');