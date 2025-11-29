// ==========================================
// MENU HAMBURGER
// ==========================================
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mainNav.classList.toggle('active');
        document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });

    // Fermer le menu lors du clic sur un lien
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Fermer le menu lors du clic en dehors
    document.addEventListener('click', (e) => {
        if (!mainNav.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ==========================================
// HEADER SCROLL EFFECT
// ==========================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        header.style.padding = '0.5rem 0';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
        header.style.padding = '1rem 0';
    }
    
    lastScroll = currentScroll;
});

// ==========================================
// SMOOTH SCROLL
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Ignore les liens vides ou # seulement
        if (!href || href === '#') {
            e.preventDefault();
            return;
        }
        
        const target = document.querySelector(href);
        
        if (target) {
            e.preventDefault();
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// ANIMATION AU SCROLL (Intersection Observer)
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Éléments à animer
const animateElements = document.querySelectorAll('.service-card, .project-card, .testimonial-card, .process-step, .stat-box');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ==========================================
// FORM HANDLING
// ==========================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Récupération des valeurs
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone')?.value || '',
            service: document.getElementById('service')?.value || '',
            message: document.getElementById('message').value
        };
        
        // Validation basique
        if (!formData.name || !formData.email || !formData.message) {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Ici, vous pouvez ajouter votre logique d'envoi de formulaire
        // Par exemple, utiliser fetch() pour envoyer à un backend
        
        console.log('Form data:', formData);
        
        // Simulation d'envoi réussi
        alert(`Merci ${formData.name}! Votre message a été envoyé avec succès. Nous vous contacterons à ${formData.email} sous peu.`);
        
        // Reset du formulaire
        contactForm.reset();
    });
}

// ==========================================
// ACTIVE LINK NAVIGATION
// ==========================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
        
        if (navLink && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            // Enlever l'active de tous les liens
            document.querySelectorAll('.nav__link').forEach(link => {
                link.style.color = '';
            });
            // Ajouter l'active au lien courant (sauf CTA)
            if (!navLink.classList.contains('nav__link--cta')) {
                navLink.style.color = 'var(--color-accent)';
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ==========================================
// COMPTEURS ANIMÉS POUR LES STATS
// ==========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
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

// Observer pour les stats
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-box__number, .stat__number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                const targetNumber = parseInt(statNumber.textContent);
                if (!isNaN(targetNumber)) {
                    animateCounter(statNumber, targetNumber);
                }
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-box, .stat').forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// PARALLAX EFFECT (léger) sur le hero
// ==========================================
const hero = document.querySelector('.hero');
if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.hero__bg');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ==========================================
// LAZY LOADING IMAGES
// ==========================================
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        if (img.dataset.src) {
            img.src = img.dataset.src;
        }
    });
} else {
    // Fallback pour les navigateurs plus anciens
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c🚀 Site développé par TRIDEV', 'color: #9DD33A; font-size: 18px; font-weight: bold;');
console.log('%c💼 Besoin de services de développement?', 'color: #153B66; font-size: 14px;');
console.log('%c📧 contact@tridev.com', 'color: #3A3A3A; font-size: 14px;');

// ==========================================
// EASTER EGG - Konami Code
// ==========================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiPattern.length - 1, konamiCode.length - konamiPattern.length);
    
    if (konamiCode.join('') === konamiPattern.join('')) {
        console.log('%c🎮 Code Konami activé! Vous avez trouvé l\'easter egg!', 'color: #9DD33A; font-size: 20px; font-weight: bold;');
        document.body.style.animation = 'rainbow 3s infinite';
    }
});

// ==========================================
// PERFORMANCE MONITORING
// ==========================================
if (window.performance) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`⚡ Page chargée en ${pageLoadTime}ms`);
        }, 0);
    });
}