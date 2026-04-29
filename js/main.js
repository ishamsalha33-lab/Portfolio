/* ============================================
   MAIN.JS - ANIMATIONS PREMIUM
   Portfolio BTS SIO E5
============================================ */

// ============================================
// 1. PARTICLES BACKGROUND (Canvas)
// ============================================
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseX = null;
        this.mouseY = null;
        
        this.init();
        this.animate();
        this.handleResize();
        this.handleMouse();
    }
    
    init() {
        this.setCanvasSize();
        this.createParticles(150);
    }
    
    setCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles(count) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.3,
                speedY: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.2,
                color: this.getRandomColor()
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            'rgba(99, 102, 241, ',  // primary
            'rgba(236, 72, 153, ',  // secondary
            'rgba(6, 182, 212, '    // accent
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    handleMouse() {
        window.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.setCanvasSize();
        });
    }
    
    animate() {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Mouse interaction
            if (this.mouseX && this.mouseY) {
                const dx = particle.x - this.mouseX;
                const dy = particle.y - this.mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 100) {
                    const angle = Math.atan2(dy, dx);
                    const force = (100 - distance) / 100 * 2;
                    particle.x += Math.cos(angle) * force;
                    particle.y += Math.sin(angle) * force;
                }
            }
            
            // Wrap around edges
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color + particle.opacity + ')';
            this.ctx.fill();
        });
        
        // Draw connections between nearby particles
        this.drawConnections();
        
        requestAnimationFrame(() => this.animate());
    }
    
    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.2;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    this.ctx.stroke();
                }
            }
        }
    }
}

// ============================================
// 2. CUSTOM CURSOR
// ============================================
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.cursorFollower = document.querySelector('.cursor-follower');
        
        if (!this.cursor || !this.cursorFollower) return;
        
        this.init();
    }
    
    init() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
            
            setTimeout(() => {
                this.cursorFollower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
            }, 50);
        });
        
        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-category, .filter-btn');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursorFollower.classList.add('active');
            });
            
            el.addEventListener('mouseleave', () => {
                this.cursorFollower.classList.remove('active');
            });
        });
    }
}

// ============================================
// 3. SCROLL REVEAL ANIMATIONS (AOS like)
// ============================================
class ScrollReveal {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }
    
    init() {
        this.checkElements();
        window.addEventListener('scroll', () => this.checkElements());
        window.addEventListener('resize', () => this.checkElements());
    }
    
    checkElements() {
        this.elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top < windowHeight - 100) {
                el.classList.add('aos-visible');
            }
        });
    }
}

// Add CSS for scroll animations
const scrollStyles = document.createElement('style');
scrollStyles.textContent = `
    [data-aos] {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    [data-aos].aos-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    [data-aos="fade-up"] {
        transform: translateY(30px);
    }
    
    [data-aos="fade-left"] {
        transform: translateX(-30px);
    }
    
    [data-aos="fade-right"] {
        transform: translateX(30px);
    }
    
    [data-aos="zoom-in"] {
        transform: scale(0.9);
    }
    
    [data-aos="flip-left"] {
        transform: perspective(1000px) rotateY(-30deg);
    }
    
    [data-aos="flip-up"] {
        transform: perspective(1000px) rotateX(-30deg);
    }
    
    [data-aos].aos-visible {
        opacity: 1;
        transform: translateX(0) translateY(0) scale(1) rotateY(0) rotateX(0);
    }
`;
document.head.appendChild(scrollStyles);

// ============================================
// 4. TYPED TEXT ANIMATION
// ============================================
class TypedText {
    constructor() {
        this.element = document.querySelector('.typed-text');
        if (!this.element) return;
        
        this.texts = [
            'Développeur Full Stack',
            'Passionné par l\'IA',
            'Créateur d\'expériences web',
            'Résout des problèmes complexes'
        ];
        this.currentIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        
        this.type();
    }
    
    type() {
        const currentText = this.texts[this.currentIndex];
        
        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }
        
        if (!this.isDeleting && this.charIndex === currentText.length) {
            this.isDeleting = true;
            setTimeout(() => this.type(), 2000);
            return;
        }
        
        if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.currentIndex = (this.currentIndex + 1) % this.texts.length;
            setTimeout(() => this.type(), 500);
            return;
        }
        
        const speed = this.isDeleting ? 50 : 100;
        setTimeout(() => this.type(), speed);
    }
}

// ============================================
// 5. SKILL BARS ANIMATION
// ============================================
class SkillBars {
    constructor() {
        this.skillItems = document.querySelectorAll('.skill-item');
        this.animated = false;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.animateOnScroll());
    }
    
    animateOnScroll() {
        if (this.animated) return;
        
        const skillsSection = document.querySelector('.competences');
        if (!skillsSection) return;
        
        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            this.skillItems.forEach(item => {
                const skill = item.getAttribute('data-skill');
                if (skill) {
                    const progressBar = item.querySelector('.skill-progress');
                    if (progressBar) {
                        progressBar.style.width = skill + '%';
                    }
                }
            });
            this.animated = true;
        }
    }
}

// ============================================
// 6. STATISTICS COUNTER
// ============================================
class StatCounter {
    constructor() {
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.animated = false;
        
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => this.startCounters());
    }
    
    startCounters() {
        if (this.animated) return;
        
        const statsSection = document.querySelector('.hero-stats');
        if (!statsSection) return;
        
        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            this.statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                if (target && !stat.classList.contains('counted')) {
                    this.counter(stat, target);
                    stat.classList.add('counted');
                }
            });
            this.animated = true;
        }
    }
    
    counter(element, target) {
        let current = 0;
        const increment = target / 50;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(interval);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 30);
    }
}

// ============================================
// 7. NAVBAR SCROLL EFFECT
// ============================================
class NavbarEffect {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.init();
    }
    
    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// ============================================
// 8. MOBILE MENU TOGGLE
// ============================================
class MobileMenu {
    constructor() {
        this.toggle = document.querySelector('.nav-toggle');
        this.navLinks = document.querySelector('.nav-links');
        
        if (!this.toggle) return;
        
        this.init();
    }
    
    init() {
        this.toggle.addEventListener('click', () => {
            this.toggle.classList.toggle('active');
            this.navLinks.classList.toggle('active');
        });
    }
}

// Add mobile menu styles
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 768px) {
        .nav-toggle {
            display: flex;
        }
        
        .nav-links {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(2, 6, 23, 0.98);
            backdrop-filter: blur(20px);
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: left 0.3s ease;
            gap: 2rem;
        }
        
        .nav-links.active {
            left: 0;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .hero {
            flex-direction: column;
            text-align: center;
            padding-top: 6rem;
        }
        
        .hero-title {
            font-size: 2.5rem;
        }
        
        .title-gradient {
            font-size: 2rem;
        }
        
        .hero-buttons {
            justify-content: center;
        }
        
        .company-grid {
            grid-template-columns: 1fr;
        }
        
        .bilan-step {
            flex-direction: column !important;
            align-items: center;
            text-align: center;
        }
        
        .timeline::before {
            left: 20px;
        }
        
        .timeline-item {
            padding-left: 3rem;
        }
        
        .timeline-marker {
            left: 12px;
        }
    }
`;
document.head.appendChild(mobileStyles);

// ============================================
// 9. PROJECT FILTER & MODAL
// ============================================
class ProjectManager {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.projects = document.querySelectorAll('.project-card');
        this.modal = document.getElementById('project-modal');
        this.detailBtns = document.querySelectorAll('.project-detail-btn');
        
        this.initFilters();
        this.initModal();
    }
    
    initFilters() {
        if (!this.filterBtns.length) return;
        
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                // Filter projects
                this.projects.forEach(project => {
                    if (filter === 'all' || project.getAttribute('data-category') === filter) {
                        project.style.display = 'block';
                        setTimeout(() => {
                            project.style.opacity = '1';
                            project.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        project.style.opacity = '0';
                        project.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            project.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    initModal() {
        if (!this.modal) return;
        
        const closeBtn = this.modal.querySelector('.modal-close');
        
        this.detailBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const projectId = btn.getAttribute('data-project');
                this.openModal(projectId);
            });
        });
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }
        
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
    }
    
    openModal(projectId) {
        if (this.modal) {
            this.modal.style.display = 'block';
        }
    }
    
    closeModal() {
        if (this.modal) {
            this.modal.style.display = 'none';
        }
    }
}

// ============================================
// 10. ARTICLE FILTER & SORT (Veille)
// ============================================
class ArticleManager {
    constructor() {
        this.sortBtns = document.querySelectorAll('.sort-btn');
        this.filterStars = document.querySelectorAll('.filter-star');
        this.articles = document.querySelectorAll('.article-card');
        
        this.initSort();
        this.initFilter();
    }
    
    initSort() {
        if (!this.sortBtns.length) return;
        
        this.sortBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.sortBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const sortBy = btn.getAttribute('data-sort');
                this.sortArticles(sortBy);
            });
        });
    }
    
    sortArticles(sortBy) {
        const articlesArray = Array.from(this.articles);
        
        articlesArray.sort((a, b) => {
            if (sortBy === 'date') {
                const dateA = new Date(a.getAttribute('data-date'));
                const dateB = new Date(b.getAttribute('data-date'));
                return dateB - dateA;
            } else if (sortBy === 'note') {
                const noteA = parseInt(a.getAttribute('data-note'));
                const noteB = parseInt(b.getAttribute('data-note'));
                return noteB - noteA;
            }
            return 0;
        });
        
        const container = document.getElementById('articles-grid');
        articlesArray.forEach(article => {
            container.appendChild(article);
        });
    }
    
    initFilter() {
        if (!this.filterStars.length) return;
        
        this.filterStars.forEach(star => {
            star.addEventListener('click', () => {
                this.filterStars.forEach(s => s.classList.remove('active'));
                star.classList.add('active');
                
                const filterValue = star.getAttribute('data-star');
                this.filterArticles(filterValue);
            });
        });
    }
    
    filterArticles(minStar) {
        this.articles.forEach(article => {
            const note = parseInt(article.getAttribute('data-note'));
            
            if (minStar === 'all') {
                article.style.display = 'block';
            } else if (minStar === '5' && note === 5) {
                article.style.display = 'block';
            } else if (minStar === '4' && note >= 4) {
                article.style.display = 'block';
            } else if (minStar === '3' && note >= 3) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }
}

// ============================================
// 11. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        
        this.init();
    }
    
    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// ============================================
// 12. 3D TILT EFFECT ON CARDS
// ============================================
class TiltEffect {
    constructor() {
        this.cards = document.querySelectorAll('.project-card, .skill-category, .soft-card');
        
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const tiltX = (y - centerY) / centerY * 5;
                const tiltY = (x - centerX) / centerX * -5;
                
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
    }
}

// ============================================
// 13. GLOW EFFECT ON HOVER
// ============================================
class GlowEffect {
    constructor() {
        this.elements = document.querySelectorAll('.btn-primary, .btn-outline');
        
        this.init();
    }
    
    init() {
        this.elements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                el.style.setProperty('--glow-x', `${x}px`);
                el.style.setProperty('--glow-y', `${y}px`);
            });
        });
    }
}

// Add glow styles
const glowStyles = document.createElement('style');
glowStyles.textContent = `
    .btn-primary, .btn-outline {
        position: relative;
        overflow: hidden;
    }
    
    .btn-primary::before, .btn-outline::before {
        content: '';
        position: absolute;
        top: var(--glow-y, 50%);
        left: var(--glow-x, 50%);
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        transition: width 0.4s ease, height 0.4s ease;
        pointer-events: none;
        border-radius: 50%;
    }
    
    .btn-primary:hover::before, .btn-outline:hover::before {
        width: 200px;
        height: 200px;
    }
`;
document.head.appendChild(glowStyles);

// ============================================
// 14. INITIALIZE ALL
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    new ParticleSystem();
    new CustomCursor();
    new ScrollReveal();
    new TypedText();
    new SkillBars();
    new StatCounter();
    new NavbarEffect();
    new MobileMenu();
    new ProjectManager();
    new ArticleManager();
    new SmoothScroll();
    new TiltEffect();
    new GlowEffect();
    
    // Add loading class removal
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
});

// ============================================
// 15. PREVENT RIGHT CLICK ON IMAGES (optional)
// ============================================
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// ============================================
// 16. ADD INTERSECTION OBSERVER FOR BETTER PERFORMANCE
// ============================================
class LazyLoadObserver {
    constructor() {
        this.images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            this.initObserver();
        } else {
            this.loadImagesImmediately();
        }
    }
    
    initObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.getAttribute('data-src');
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });
        
        this.images.forEach(img => observer.observe(img));
    }
    
    loadImagesImmediately() {
        this.images.forEach(img => {
            img.src = img.getAttribute('data-src');
            img.removeAttribute('data-src');
        });
    }
}

// Initialize lazy load
new LazyLoadObserver();

// ============================================
// 17. CONSOLE WELCOME MESSAGE
// ============================================
console.log('%c Portfolio BTS SIO E5 - Isham  Salhatou', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cBienvenue sur mon portfolio ! N\'hésitez pas à explorer mes réalisations.', 'color: #94a3b8; font-size: 12px;');