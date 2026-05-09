const words = ["Bot Developer", "Backend Enthusiast", "Problem Solver", "API Integrator"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedTextElement = document.querySelector('.typed-text');

function typeEffect() {
    const currentWord = words[wordIndex];
    
    if (isDeleting) {
        typedTextElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }
    
    setTimeout(typeEffect, isDeleting ? 80 : 120);
}

typeEffect();

// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Active nav link
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Loading screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hide');
    }, 800);
});

// Skill bar animation on scroll
const skillCards = document.querySelectorAll('.skill-card');
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('.skill-progress');
            if (progressBar) {
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                setTimeout(() => {
                    progressBar.style.width = width;
                }, 100);
            }
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

skillCards.forEach(card => {
    skillObserver.observe(card);
});

// Parallax effect for spheres
document.addEventListener('mousemove', (e) => {
    const spheres = document.querySelectorAll('.gradient-sphere');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    spheres.forEach((sphere, index) => {
        const speed = (index + 1) * 20;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        sphere.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Fade up elements that appear on scroll
const fadeElements = document.querySelectorAll('.fade-up');
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeUp 0.8s ease forwards';
            fadeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeElements.forEach(el => {
    fadeObserver.observe(el);
});
