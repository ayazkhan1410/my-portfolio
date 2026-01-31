// ============================================
// SMOOTH SCROLLING & ACTIVE NAV LINK
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Update active nav link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll on nav link click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe skill cards and project cards
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.skill-card, .project-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
});

// ============================================
// FORM SUBMISSION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            fetch(this.action, {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    submitBtn.textContent = 'Message Sent!';
                    submitBtn.style.background = '#00ff9d';
                    contactForm.reset();
                } else {
                    // If the form isn't setup yet (e.g. email not verified), 
                    // Formspree might return an error. Fallback to standard submit.
                    if (response.status === 403 || response.status === 404) {
                        contactForm.submit(); // Standard submit to trigger Formspree setup page
                        return;
                    }
                    response.json().then(data => {
                        if (Object.hasOwn(data, 'errors')) {
                            alert(data["errors"].map(error => error["message"]).join(", "));
                        } else {
                            alert("Oops! There was a problem submitting your form");
                        }
                    });
                    submitBtn.textContent = originalText;
                }
            }).catch(error => {
                alert("Oops! There was a problem submitting your form");
                submitBtn.textContent = originalText;
            }).finally(() => {
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                }, 3000);
            });
        });
    }
});

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar-custom');
    
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    }
});

// ============================================
// COUNTER ANIMATION FOR STATS
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Observe stats section
document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.about-stats');
    let hasAnimated = false;
    
    if (statsSection) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    const statNumbers = document.querySelectorAll('.stat-number');
                    
                    statNumbers.forEach(stat => {
                        const number = parseInt(stat.textContent);
                        animateCounter(stat, number);
                    });
                    
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        statsObserver.observe(statsSection);
    }
});

// ============================================
// MOBILE MENU CLOSE ON LINK CLICK
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });

    // ============================================
    // TYPEWRITER EFFECT
    // ============================================
    const typewriter = document.getElementById('typewriter');
    const cursor = document.querySelector('.cursor');
    if (typewriter) {
        const text = "Hi, I'am Ayaz Khan";
        let index = 0;
        const speed = 100;

        function type() {
            if (index < text.length) {
                typewriter.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            }
        }
        // Start typing after a short delay
        setTimeout(type, 500);
    }
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Create scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'scroll-to-top';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    // Add styles for scroll to top button
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #00ff9d, #00e5ff);
            color: #030307;
            border: none;
            border-radius: 0;
            clip-path: polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%);
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            z-index: 999;
            transition: all 0.3s ease;
            box-shadow: 0 10px 25px rgba(0, 255, 157, 0.3);
        }
        
        .scroll-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 35px rgba(0, 229, 255, 0.4);
        }
        
        .scroll-to-top.show {
            display: flex;
        }
        
        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
                font-size: 18px;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    // Scroll to top on button click
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ============================================
// PARALLAX EFFECT (Optional Enhancement)
// ============================================

window.addEventListener('scroll', function() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        const scrollPosition = window.scrollY;
        heroSection.style.backgroundPosition = `0 ${scrollPosition * 0.5}px`;
    }
});

// ============================================
// LAZY LOADING IMAGES (Future Enhancement)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; color: #00e5ff; font-weight: bold;');
console.log('%cLooking for a web developer? Let\'s talk! 💻', 'font-size: 14px; color: #00ff9d;');
console.log('%cEmail: programmingwithayaz@gmail.com', 'font-size: 12px; color: #9aa4bf;');

document.addEventListener('DOMContentLoaded', function() {
    const codeStream = document.getElementById('codeStream');
    if (!codeStream) return;

    const lines = [
        "const build = () => ui.combine(performance, accessibility);",
        "fetch('/api/launch').then(res => res.json()).then(console.log);",
        "const neon = ['#00ff9d', '#00e5ff', '#00ff9d'];",
        "function deploy(app) { return pipeline.ship(app, { edge: true }); }",
        "if (user.needsLanding) design.optimize().deliver();",
        "const stack = ['React', 'Node', 'Postgres', 'Docker'];",
        "router.get('/projects', (req, res) => res.send(portfolio));",
        "const glow = theme.set({ mode: 'neon-dark' });",
        "while(building) { iterate(); test(); ship(); }",
        "const speed = perf.audit().score();"
    ];

    let lineIndex = 0;
    let charIndex = 0;
    let buffer = '';

    const type = () => {
        const line = lines[lineIndex];
        buffer += line.charAt(charIndex);
        charIndex += 1;

        if (charIndex >= line.length) {
            buffer += '\n';
            charIndex = 0;
            lineIndex = (lineIndex + 1) % lines.length;
        }

        if (buffer.length > 2400) {
            buffer = buffer.slice(buffer.length - 2400);
        }

        codeStream.textContent = buffer;
        const speed = Math.random() * 40 + 25;
        setTimeout(type, speed);
    };

    type();
});
