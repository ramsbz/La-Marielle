document.addEventListener('DOMContentLoaded', () => {
    
    // GESTION DU FORMULAIRE DE CONTACT
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                formFeedback.className = 'form-feedback error';
                formFeedback.textContent = 'Veuillez remplir tous les champs du formulaire.';
                return;
            }

            // Simulation d'envoi réussi
            formFeedback.className = 'form-feedback success';
            formFeedback.textContent = 'Merci pour votre message. L\'équipe de La Marielle vous répondra sous peu.';
            contactForm.reset();
        });
    }

});

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. EN-TÊTE FIXE AU DÉFILEMENT (STICKY HEADER)
       ========================================================================== */
    const header = document.querySelector('.main-header');
    
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }


/* ==========================================================================
   2. NAVIGATION MOBILE (MENU BURGER)
   ========================================================================== */
const mainNav = document.querySelector('.main-nav');
// Recherche le conteneur dans l'en-tête ou prend le parent direct du nav
const headerContainer = document.querySelector('.main-header .container') || mainNav?.parentElement;

if (mainNav && headerContainer) {
    let burgerBtn = document.querySelector('.mobile-burger');
    
    if (!burgerBtn) {
        burgerBtn = document.createElement('button');
        burgerBtn.classList.add('mobile-burger');
        burgerBtn.setAttribute('aria-label', 'Ouvrir le menu');
        burgerBtn.innerHTML = '<span></span><span></span><span></span>';
        headerContainer.appendChild(burgerBtn);
    }

    burgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        mainNav.classList.toggle('nav-open');
        burgerBtn.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
        if (mainNav.classList.contains('nav-open') && !mainNav.contains(e.target) && !burgerBtn.contains(e.target)) {
            mainNav.classList.remove('nav-open');
            burgerBtn.classList.remove('active');
        }
    });
}

    /* ==========================================================================
       3. DÉFILEMENT FLUIDE (SMOOTH SCROLL)
       ========================================================================== */
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            if (targetId !== '#' && targetId !== '') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Ferme le menu mobile si ouvert
                    if (mainNav && mainNav.classList.contains('nav-open')) {
                        mainNav.classList.remove('nav-open');
                    }

                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });


    /* ==========================================================================
       4. ANIMATIONS D'APPARITION AU DÉFILEMENT (INTERSECTION OBSERVER)
       ========================================================================== */
    const animatedElements = document.querySelectorAll('.menu-item, .value-card, .intro-text, .intro-image');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        };

        const appearanceObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            el.classList.add('fade-in-hidden');
            appearanceObserver.observe(el);
        });
    }


    /* ==========================================================================
       5. GESTION DU FORMULAIRE DE CONTACT & RÉSERVATION
       ========================================================================== */
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const subject = document.getElementById('subject')?.value;
            const message = document.getElementById('message')?.value.trim();

            if (!name || !email || !subject || !message) {
                showFeedback('Veuillez remplir tous les champs du formulaire.', 'error');
                return;
            }

            // Validation rapide de l'adresse email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showFeedback('Veuillez saisir une adresse email valide.', 'error');
                return;
            }

            // Simulation d'envoi
            showFeedback('Merci pour votre message. L\'équipe de La Marielle vous répondra dans les plus brefs délais.', 'success');
            contactForm.reset();
        });
    }

    function showFeedback(message, type) {
        if (!formFeedback) return;
        formFeedback.className = `form-feedback ${type}`;
        formFeedback.textContent = message;
    }

});