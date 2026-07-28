document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    /* ==========================================================================
       THEME SWITCHING SYSTEM
       ========================================================================== */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Load theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    body.className = savedTheme;
    updateThemeToggleUI(savedTheme);

    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
            updateThemeToggleUI('light-theme');
            showToast('Switched to Light Mode', 'sun');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
            updateThemeToggleUI('dark-theme');
            showToast('Switched to Dark Mode', 'moon');
        }
    });

    function updateThemeToggleUI(theme) {
        // Re-run Lucide in case icons need update, or handle via CSS
        const sunIcon = document.querySelector('#theme-toggle .sun-icon');
        const moonIcon = document.querySelector('#theme-toggle .moon-icon');
        if (theme === 'dark-theme') {
            themeToggle.title = 'Switch to Light Mode';
        } else {
            themeToggle.title = 'Switch to Dark Mode';
        }
    }

    /* ==========================================================================
       MOBILE NAVIGATION DRAWER
       ========================================================================== */
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-cta');

    const openMenu = () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    };

    mobileMenuToggle.addEventListener('click', openMenu);
    mobileMenuClose.addEventListener('click', closeMenu);

    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    /* ==========================================================================
       TYPING TEXT EFFECT
       ========================================================================== */
    const typedTextSpan = document.getElementById('typed-text');
    const roles = ["Laravel Frameworks", "Node.js Backends", "React Dashboards", "RESTful APIs", "Cloud Infrastructure", "Clean & Scalable Code"];
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const newWordDelay = 2000;
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        if (!typedTextSpan) return;
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let dynamicSpeed = isDeleting ? erasingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            // Word fully typed, wait and start deleting
            dynamicSpeed = newWordDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            dynamicSpeed = 500; // brief pause before next word
        }

        setTimeout(typeEffect, dynamicSpeed);
    }

    setTimeout(typeEffect, 1000);

    /* ==========================================================================
       HERO BACKGROUND PARTICLES CANVAS
       ========================================================================== */
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let connectionDistance = 110;
        let particleCount = 65;

        // Resize Canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (canvas.width < 768) {
                particleCount = 30;
                connectionDistance = 80;
            } else {
                particleCount = 65;
                connectionDistance = 110;
            }
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Particle Constructor
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.radius = Math.random() * 2 + 1;
            }

            draw() {
                const isLight = document.body.classList.contains('light-theme');
                ctx.fillStyle = isLight ? 'rgba(142, 45, 226, 0.4)' : 'rgba(191, 90, 242, 0.5)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce walls
                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            }
        }

        // Initialize
        function initParticles() {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        // Animation Loop
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const isLight = document.body.classList.contains('light-theme');
            const strokeColor = isLight ? 'rgba(142, 45, 226, 0.05)' : 'rgba(191, 90, 242, 0.07)';

            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();

                // Draw connection lines
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        ctx.strokeStyle = strokeColor;
                        ctx.lineWidth = 1 - dist / connectionDistance;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    /* ==========================================================================
       SCROLL-DRIVEN OBSERVATIONS & ANIMATIONS
       ========================================================================== */
    
    // 1. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it's a skill progress bar, trigger the slide fill
                if (entry.target.classList.contains('skill-card')) {
                    const fill = entry.target.querySelector('.progress-fill');
                    if (fill) {
                        // Triggers transition from 0 to CSS-defined width
                        const finalWidth = fill.style.width;
                        fill.style.width = '0%';
                        setTimeout(() => {
                            fill.style.width = finalWidth;
                        }, 50);
                    }
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Active Navigation Section Sync
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const activeNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -50% 0px'
    });

    sections.forEach(sec => {
        activeNavObserver.observe(sec);
    });

    // 3. Stats Counter Animation
    const statsSection = document.querySelector('.about-section');
    const statsNumbers = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function startCounters() {
        statsNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // ~60fps
            
            const updateCount = () => {
                count += increment;
                if (count >= target) {
                    counter.textContent = target + (target === 99 ? 'ms' : target === 20 || target === 50 ? '+' : '');
                } else {
                    counter.textContent = Math.floor(count);
                    requestAnimationFrame(updateCount);
                }
            };
            updateCount();
        });
    }

    if (statsSection) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !countersStarted) {
                countersStarted = true;
                startCounters();
            }
        }, { threshold: 0.2 });
        statsObserver.observe(statsSection);
    }

    // 4. Timeline Nodes Scrolling Accent
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '-50px 0px -40% 0px'
    });

    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });

    /* ==========================================================================
       GRID CATEGORY FILTERS (SKILLS & PROJECTS)
       ========================================================================== */

    // 1. Projects Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardType = card.getAttribute('data-type');
                if (category === 'all' || cardType === category) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 2. Skills Filter
    const skillsTabButtons = document.querySelectorAll('.skills-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillsTabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            skillsTabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    /* ==========================================================================
       CONTACT FORM SYSTEM & VALDIATION
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Perform Form Validation
            let isValid = true;
            const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
            
            inputs.forEach(input => {
                const formGroup = input.closest('.form-group');
                if (!input.value.trim()) {
                    formGroup.classList.add('has-error');
                    isValid = false;
                } else if (input.type === 'email' && !validateEmail(input.value)) {
                    formGroup.classList.add('has-error');
                    isValid = false;
                } else {
                    formGroup.classList.remove('has-error');
                }
            });

            if (!isValid) return;

            // Submit Process (Mock API call)
            contactForm.classList.add('submitting');
            
            setTimeout(() => {
                contactForm.classList.remove('submitting');
                showToast('Message submitted successfully!', 'check-circle-2');
                contactForm.reset();
            }, 1800);
        });

        // Remove error indicators when typing
        contactForm.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', () => {
                const formGroup = input.closest('.form-group');
                if (input.value.trim()) {
                    formGroup.classList.remove('has-error');
                }
            });
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    /* ==========================================================================
       CLIPBOARD ACTIONS & DIRECT BUTTONS
       ========================================================================== */
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const emailValue = copyEmailBtn.querySelector('.detail-value').textContent;
            navigator.clipboard.writeText(emailValue)
                .then(() => {
                    showToast('Email address copied to clipboard!', 'copy');
                })
                .catch(() => {
                    showToast('Failed to copy email address.', 'alert-circle');
                });
        });
    }

    const downloadCVBtn = document.getElementById('download-cv');
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', () => {
            showToast('Downloading curriculum vitae...', 'download');
            
            // Mock Download trigger
            setTimeout(() => {
                const link = document.createElement('a');
                link.href = '#'; // In production, reference a local cv.pdf path
                link.setAttribute('download', 'CV_Fullstack_Developer.pdf');
                document.body.appendChild(link);
                // Not actually clicking because it's a mock action, but in a real setting, it would call link.click();
                showToast('Download complete!', 'check');
            }, 1200);
        });
    }

    /* ==========================================================================
       TOAST SYSTEM HELPER
       ========================================================================== */
    function showToast(message, iconName = 'info') {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toast-message');
        const toastIcon = toast.querySelector('.toast-icon');

        if (!toast || !toastMsg) return;

        // Reset class to clear previous animations if click is fast
        toast.classList.remove('show');
        
        // Update Icon and text
        toastMsg.textContent = message;
        
        if (toastIcon && typeof lucide !== 'undefined') {
            toastIcon.setAttribute('data-lucide', iconName);
            lucide.createIcons(); // refresh icon markup
        }

        // Trigger Layout reflow
        void toast.offsetWidth;

        // Show Toast
        toast.classList.add('show');

        // Hide after 3.5s
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3500);
    }
});
