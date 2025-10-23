// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
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

    // Login button functionality
    const loginBtn = document.querySelector('.btn-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // Проверяем, находимся ли мы в папке pages
            if (window.location.pathname.includes('/pages/')) {
                window.location.href = 'login.html';
            } else {
                window.location.href = 'pages/login.html';
            }
        });
    }

    // Registration button functionality
    const registerBtn = document.querySelector('.btn-register');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            openRegistrationModal();
        });
    }

    // CTA buttons functionality
    const ctaBtn = document.querySelector('.btn-cta');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', function() {
            const categoriesSection = document.querySelector('#categories');
            if (categoriesSection) {
                categoriesSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    const contactBtn = document.querySelector('.btn-contact');
    if (contactBtn) {
        contactBtn.addEventListener('click', function() {
            openRegistrationModal();
        });
    }

    // Large login button functionality
    const loginLargeBtn = document.querySelector('.btn-login-large');
    if (loginLargeBtn) {
        loginLargeBtn.addEventListener('click', function() {
            // Проверяем, находимся ли мы в папке pages
            if (window.location.pathname.includes('/pages/')) {
                window.location.href = 'login.html';
            } else {
                window.location.href = 'pages/login.html';
            }
        });
    }

    // Category cards click functionality
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            // Проверяем, находимся ли мы в папке pages
            if (window.location.pathname.includes('/pages/')) {
                window.location.href = `all-offers.html?category=${category}`;
            } else {
                window.location.href = `pages/all-offers.html?category=${category}`;
            }
        });
    });

    // Language selector functionality
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
        languageSelector.addEventListener('change', function() {
            const selectedLanguage = this.value;
            console.log('Selected language:', selectedLanguage);
            // Здесь можно добавить логику смены языка
        });
    }
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add animation on scroll for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe category cards
document.querySelectorAll('.category-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe step cards
document.querySelectorAll('.step-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.8s ease ${index * 0.2}s, transform 0.8s ease ${index * 0.2}s`;
    observer.observe(card);
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translateY(${rate}px)`;
    }
});

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
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

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Add smooth reveal animation for sections
const sectionObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// Modal functionality
function openRegistrationModal() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeRegistrationModal() {
    const modal = document.getElementById('registrationModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('registrationModal');
    const closeBtn = document.querySelector('.modal-close');
    const cancelBtn = document.querySelector('.btn-cancel');
    const form = document.getElementById('registrationForm');
    const textarea = document.getElementById('additionalInfo');
    const charCount = document.getElementById('charCount');

    // Close modal events
    if (closeBtn) {
        closeBtn.addEventListener('click', closeRegistrationModal);
    }
    
    if (cancelBtn) {
        cancelBtn.addEventListener('click', closeRegistrationModal);
    }

    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeRegistrationModal();
            }
        });
    }

    // Character counter for textarea
    if (textarea && charCount) {
        textarea.addEventListener('input', function() {
            const count = this.value.length;
            charCount.textContent = count;
            
            if (count > 1000) {
                charCount.style.color = '#e74c3c';
            } else if (count > 800) {
                charCount.style.color = '#f39c12';
            } else {
                charCount.style.color = '#666';
            }
        });
    }

    // Form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (!data.companyName || !data.contactName || !data.contactEmail || !data.contactPhone || !data.region || !data.employeesCount) {
                alert('Пожалуйста, заполните все обязательные поля');
                return;
            }

            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.contactEmail)) {
                alert('Пожалуйста, введите корректный email адрес');
                return;
            }

            // Validate phone (basic validation)
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(data.contactPhone)) {
                alert('Пожалуйста, введите корректный номер телефона');
                return;
            }

            // Simulate form submission
            const submitBtn = form.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('Заявка успешно отправлена! Мы свяжемся с вами в течение 2-3 рабочих дней.');
                form.reset();
                charCount.textContent = '0';
                charCount.style.color = '#666';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                closeRegistrationModal();
            }, 2000);
        });
    }
});
