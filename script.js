// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate counter numbers
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            
            updateCounter();
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                
                // Animate counters when community section is visible
                if (entry.target.classList.contains('community-stats')) {
                    animateCounters();
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.overview-card, .feature-card, .reward-card, .level-card, .community-stats, .step');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Level progression interaction
    const levelCards = document.querySelectorAll('.level-card');
    
    levelCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            levelCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Add some visual feedback
            this.style.transform = 'scale(1.05)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Dynamic gradient animation
    function animateGradients() {
        const gradientElements = document.querySelectorAll('.btn-primary, .level-badge, .stat-card');
        
        gradientElements.forEach(element => {
            let angle = 0;
            
            setInterval(() => {
                angle += 1;
                if (angle >= 360) angle = 0;
                
                const gradient = `linear-gradient(${angle}deg, #00d4ff, #ff6b35)`;
                element.style.background = gradient;
            }, 50);
        });
    }

    // Initialize gradient animation
    animateGradients();

    // Add hover effect to cards
    const cards = document.querySelectorAll('.overview-card, .feature-card, .reward-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Typing effect for hero title
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing effect
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title .highlight');
        if (heroTitle) {
            typeWriter(heroTitle, 'Techfest', 100);
        }
    }, 1000);

    // Progressive enhancement for registration steps
    const steps = document.querySelectorAll('.step');
    let currentStep = 0;
    
    function highlightStep(index) {
        steps.forEach((step, i) => {
            if (i === index) {
                step.style.background = 'linear-gradient(45deg, rgba(0, 212, 255, 0.3), rgba(255, 107, 53, 0.3))';
                step.style.transform = 'translateX(10px) scale(1.05)';
            } else {
                step.style.background = 'rgba(255, 255, 255, 0.1)';
                step.style.transform = 'translateX(0) scale(1)';
            }
        });
    }

    // Auto-highlight steps
    setInterval(() => {
        highlightStep(currentStep);
        currentStep = (currentStep + 1) % steps.length;
    }, 3000);

    // Add click interaction to CTA button
    const ctaButton = document.querySelector('.cta-section .btn');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Scroll-triggered animations
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        // Animate floating elements
        const floatingElements = document.querySelectorAll('.floating-card');
        floatingElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrollTop * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrollTop * 0.1}deg)`;
        });
    });

    // Easter egg: Konami code
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            // Activate special effect
            document.body.style.filter = 'hue-rotate(180deg)';
            setTimeout(() => {
                document.body.style.filter = '';
            }, 5000);
            
            // Show message
            const message = document.createElement('div');
            message.textContent = '🎉 Legend Mode Activated! 🎉';
            message.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #00d4ff, #ff6b35);
                color: white;
                padding: 20px 40px;
                border-radius: 20px;
                font-size: 1.5rem;
                font-weight: bold;
                z-index: 10000;
                animation: bounceIn 0.5s ease-out;
            `;
            
            document.body.appendChild(message);
            
            setTimeout(() => {
                message.remove();
            }, 3000);
            
            konamiCode = [];
        }
    });

    // Add CSS for bounceIn animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounceIn {
            0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0; }
            50% { transform: translate(-50%, -50%) scale(1.05); }
            70% { transform: translate(-50%, -50%) scale(0.9); }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            background-color: rgba(255, 255, 255, 0.7);
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Performance optimization: Throttle scroll events
    let ticking = false;
    
    function updateScrollEffects() {
        // All scroll-based animations go here
        const scrollTop = window.pageYOffset;
        
        // Update navbar
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Preload images and optimize performance
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Add click interaction to GitHub buttons
    const githubButtons = document.querySelectorAll('.btn-github, .github-btn, .footer-github-link');
    githubButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Add analytics or tracking here if needed
            console.log('GitHub repository link clicked');
        });
    });

    // Floating GitHub button animation
    const floatingGithub = document.querySelector('.floating-github');
    if (floatingGithub) {
        let isVisible = true;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            
            // Hide button near footer
            if (scrollTop + windowHeight > documentHeight - 200) {
                if (isVisible) {
                    floatingGithub.style.opacity = '0';
                    floatingGithub.style.transform = 'translateY(-50%) translateX(100px)';
                    isVisible = false;
                }
            } else {
                if (!isVisible) {
                    floatingGithub.style.opacity = '1';
                    floatingGithub.style.transform = 'translateY(-50%) translateX(0)';
                    isVisible = true;
                }
            }
        });
    }

    console.log('🚀 Techfest CA Program 2025 - Interactive features loaded!');
});
