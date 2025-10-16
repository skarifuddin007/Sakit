// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on nav links
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('select').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Legal Document Modal
const legalModal = document.getElementById('legal-modal');
const modalTitle = document.getElementById('modal-title');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');

// Legal document content
const legalContent = {
    terms: {
        title: 'Terms of Service',
        content: `
            <h4>1. Acceptance of Terms</h4>
            <p>By accessing and using TaskFlow AI, you accept and agree to be bound by the terms and provision of this agreement.</p>
            
            <h4>2. Service Description</h4>
            <p>TaskFlow AI provides intelligent task management services including AI-powered prioritization, team collaboration tools, and advanced analytics.</p>
            
            <h4>3. User Accounts</h4>
            <p>You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</p>
            
            <h4>4. Acceptable Use</h4>
            <p>You agree not to use the service for any unlawful purpose or to solicit others to perform unlawful acts.</p>
            
            <h4>5. Privacy Policy</h4>
            <p>Your privacy is important to us. Please review our Privacy Policy to understand how we collect and use your information.</p>
            
            <h4>6. Payment Terms</h4>
            <p>For Pro subscriptions, payment is due monthly in advance. All fees are non-refundable except as stated in our Refund Policy.</p>
            
            <h4>7. Service Modifications</h4>
            <p>We reserve the right to modify or discontinue the service at any time with reasonable notice to users.</p>
            
            <h4>8. Limitation of Liability</h4>
            <p>TaskFlow AI shall not be liable for any indirect, incidental, special, or consequential damages.</p>
            
            <h4>9. Governing Law</h4>
            <p>These terms shall be governed by and construed in accordance with applicable laws.</p>
            
            <h4>10. Contact Information</h4>
            <p>For questions about these Terms, please contact us at support@taskflow.ai</p>
        `
    },
    privacy: {
        title: 'Privacy Policy',
        content: `
            <h4>1. Information We Collect</h4>
            <p>We collect information you provide directly to us, such as when you create an account, use our services, or contact us for support.</p>
            
            <h4>2. How We Use Your Information</h4>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and communicate with you.</p>
            
            <h4>3. Information Sharing</h4>
            <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
            
            <h4>4. Data Security</h4>
            <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            
            <h4>5. Cookies and Analytics</h4>
            <p>We use cookies and similar technologies to analyze trends, administer the website, and gather demographic information.</p>
            
            <h4>6. Data Retention</h4>
            <p>We retain your information for as long as necessary to provide services and fulfill the purposes outlined in this policy.</p>
            
            <h4>7. Your Rights</h4>
            <p>You have the right to access, update, or delete your personal information. Contact us to exercise these rights.</p>
            
            <h4>8. International Transfers</h4>
            <p>Your information may be transferred to and processed in countries other than your own, subject to appropriate safeguards.</p>
            
            <h4>9. Policy Updates</h4>
            <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
            
            <h4>10. Contact Us</h4>
            <p>If you have questions about this Privacy Policy, please contact us at support@taskflow.ai</p>
        `
    },
    refund: {
        title: 'Refund Policy',
        content: `
            <h4>1. 30-Day Money-Back Guarantee</h4>
            <p>We offer a 30-day money-back guarantee for all Pro subscriptions. If you're not satisfied, contact us for a full refund.</p>
            
            <h4>2. Refund Eligibility</h4>
            <p>Refunds are available for Pro subscriptions within 30 days of initial purchase or renewal. Free accounts are not eligible for refunds.</p>
            
            <h4>3. Refund Process</h4>
            <p>To request a refund, contact our support team at support@taskflow.ai with your account details and reason for the refund request.</p>
            
            <h4>4. Processing Time</h4>
            <p>Approved refunds will be processed within 5-7 business days and credited back to your original payment method.</p>
            
            <h4>5. Partial Refunds</h4>
            <p>For annual subscriptions, partial refunds may be provided on a pro-rata basis for unused portions of the subscription period.</p>
            
            <h4>6. Service Termination</h4>
            <p>Upon refund approval, your Pro account will be downgraded to Free, and premium features will no longer be accessible.</p>
            
            <h4>7. Disputed Charges</h4>
            <p>If you believe you were charged in error, please contact us before disputing the charge with your payment provider.</p>
            
            <h4>8. Refund Exceptions</h4>
            <p>Refunds may be denied for accounts that have violated our Terms of Service or engaged in fraudulent activity.</p>
            
            <h4>9. Contact for Refunds</h4>
            <p>Email: support@taskflow.ai<br>Phone: 1800-123-4567<br>Response time: Within 24 hours</p>
            
            <h4>10. Policy Changes</h4>
            <p>This refund policy may be updated from time to time. Current policy terms apply to all transactions.</p>
        `
    }
};

// Handle legal document links
function openLegalModal(type) {
    const content = legalContent[type];
    if (content) {
        modalTitle.textContent = content.title;
        modalBody.innerHTML = content.content;
        legalModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Legal document click handlers
const legalCards = document.querySelectorAll('[data-legal]');
legalCards.forEach(card => {
    card.addEventListener('click', () => {
        const type = card.getAttribute('data-legal');
        openLegalModal(type);
    });
});

// Footer legal links
const footerLegalLinks = document.querySelectorAll('a[data-legal]');
footerLegalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const type = link.getAttribute('data-legal');
        openLegalModal(type);
    });
});

// Close modal
if (modalClose) {
    modalClose.addEventListener('click', () => {
        legalModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Close modal when clicking outside
if (legalModal) {
    legalModal.addEventListener('click', (e) => {
        if (e.target === legalModal) {
            legalModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? 'rgba(16, 185, 129, 0.9)' : 'rgba(239, 68, 68, 0.9)'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        backdrop-filter: blur(20px);
        z-index: 1001;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 300);
}

// CTA Button Handlers
const ctaButtons = document.querySelectorAll('.hero-cta .btn-primary, .btn-green, .btn-gradient');
ctaButtons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent.trim();
        if (buttonText === 'Get Started' || buttonText === 'Get Started Free') {
            showNotification('Welcome! Your Free account is ready to use.', 'success');
        } else if (buttonText === 'Upgrade to Pro') {
            showNotification('Redirecting to Pro subscription...', 'info');
        } else if (buttonText === 'Learn More') {
            // Scroll to features section
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                const offsetTop = featuresSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Scroll-based animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .pricing-card, .faq-item, .legal-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
} else {
    animateOnScroll();
}

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let scrolled = false;

function updateNavbar() {
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 50 && !scrolled) {
        scrolled = true;
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
    } else if (scrollTop <= 50 && scrolled) {
        scrolled = false;
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
        navbar.style.backdropFilter = 'blur(20px)';
    }
}

window.addEventListener('scroll', updateNavbar);

// Floating cards animation enhancement
const floatingCards = document.querySelectorAll('.floating-card');
let animationFrame;

function enhanceFloatingAnimation() {
    floatingCards.forEach((card, index) => {
        const time = Date.now() * 0.001;
        const offset = index * 2;
        const yOffset = Math.sin(time + offset) * 10;
        const rotateOffset = Math.sin(time * 0.5 + offset) * 2;
        
        card.style.transform = `translateY(${yOffset}px) rotate(${rotateOffset}deg)`;
    });
    
    animationFrame = requestAnimationFrame(enhanceFloatingAnimation);
}

// Start enhanced animation when hero is visible
const heroSection = document.getElementById('home');
if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                enhanceFloatingAnimation();
            } else {
                cancelAnimationFrame(animationFrame);
            }
        });
    }, { threshold: 0.3 });
    
    heroObserver.observe(heroSection);
}

// Escape key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && legalModal.style.display === 'block') {
        legalModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

console.log('TaskFlow AI - Application loaded successfully!');