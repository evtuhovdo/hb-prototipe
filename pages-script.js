// Pages Specific JavaScript

// Login Page Functions
document.addEventListener('DOMContentLoaded', function() {
    // Password toggle functionality
    const passwordToggle = document.getElementById('passwordToggle');
    const passwordInput = document.getElementById('password');
    
    if (passwordToggle && passwordInput) {
        passwordToggle.addEventListener('click', function() {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            
            const eyeIcon = passwordToggle.querySelector('.eye-icon');
            eyeIcon.textContent = type === 'password' ? '👁️' : '🙈';
        });
    }
    
    // Login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-login-submit');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline';
            submitBtn.disabled = true;
            
            // Simulate login process
            setTimeout(() => {
                // Redirect to dashboard
                window.location.href = 'dashboard.html';
            }, 2000);
        });
    }

    // Forgot password functionality
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            openPasswordResetModal();
        });
    }

    // Password reset modal functionality
    const passwordResetModal = document.getElementById('passwordResetModal');
    const passwordResetForm = document.getElementById('passwordResetForm');
    const resetModalCloseBtn = passwordResetModal?.querySelector('.modal-close');
    const resetModalCancelBtn = passwordResetModal?.querySelector('.btn-cancel');

    if (resetModalCloseBtn) {
        resetModalCloseBtn.addEventListener('click', closePasswordResetModal);
    }

    if (resetModalCancelBtn) {
        resetModalCancelBtn.addEventListener('click', closePasswordResetModal);
    }

    if (passwordResetModal) {
        passwordResetModal.addEventListener('click', function(e) {
            if (e.target === passwordResetModal) {
                closePasswordResetModal();
            }
        });
    }

    if (passwordResetForm) {
        passwordResetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('resetEmail').value;
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.textContent;
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Пожалуйста, введите корректный email адрес');
                return;
            }

            // Show loading state
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;

            // Simulate password reset request
            setTimeout(() => {
                alert('Инструкции по восстановлению пароля отправлены на ваш email!');
                passwordResetForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                closePasswordResetModal();
            }, 2000);
        });
    }
});

// Offer Detail Page Functions
function copyPromoCode() {
    const promoCode = 'HEALTH20';
    navigator.clipboard.writeText(promoCode).then(function() {
        // Show success message
        showToast('Промокод скопирован!', 'success');
        
        // Update button text temporarily
        const copyBtn = document.querySelector('.copy-promo-btn');
        const originalText = copyBtn.querySelector('.copy-text').textContent;
        copyBtn.querySelector('.copy-text').textContent = 'Скопировано!';
        
        setTimeout(() => {
            copyBtn.querySelector('.copy-text').textContent = originalText;
        }, 2000);
    }).catch(function(err) {
        console.error('Could not copy text: ', err);
        showToast('Ошибка копирования', 'error');
    });
}

function getOffer() {
    // Track offer click
    console.log('User clicked on offer');
    
    // Show loading state
    const btn = document.querySelector('.btn-get-offer');
    const originalText = btn.textContent;
    btn.textContent = 'Переход...';
    btn.disabled = true;
    
    // Simulate redirect
    setTimeout(() => {
        // In real app, this would redirect to partner's website
        window.open('https://healthplus.ru', '_blank');
        
        // Reset button
        btn.textContent = originalText;
        btn.disabled = false;
    }, 1000);
}

function toggleFavorite() {
    const btn = document.querySelector('.btn-favorite');
    const icon = btn.querySelector('.favorite-icon');
    
    if (icon.textContent === '❤️') {
        icon.textContent = '💙';
        btn.style.background = 'var(--primary)';
        btn.style.color = 'var(--white)';
        showToast('Добавлено в избранное', 'success');
    } else {
        icon.textContent = '❤️';
        btn.style.background = 'var(--white)';
        btn.style.color = 'var(--primary)';
        showToast('Удалено из избранного', 'info');
    }
}

// Dashboard Page Functions
function toggleOfferFavorite(offerId) {
    const btn = event.target.closest('.btn-secondary');
    const icon = btn.querySelector('span');
    
    if (icon.textContent === '❤️') {
        icon.textContent = '💙';
        btn.style.background = 'var(--primary)';
        btn.style.color = 'var(--white)';
        showToast('Добавлено в избранное', 'success');
    } else {
        icon.textContent = '❤️';
        btn.style.background = 'var(--white)';
        btn.style.color = 'var(--primary)';
        showToast('Удалено из избранного', 'info');
    }
}

function getOfferDiscount(offerId) {
    // Track offer usage
    console.log('User used offer:', offerId);
    
    const btn = event.target;
    const originalText = btn.textContent;
    btn.textContent = 'Получено!';
    btn.disabled = true;
    btn.style.background = '#10B981';
    
    showToast('Скидка активирована!', 'success');
    
    // Reset button after delay
    setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
    }, 3000);
}

// User Menu Dropdown
document.addEventListener('DOMContentLoaded', function() {
    const userMenu = document.querySelector('.user-menu');
    const userDropdown = document.querySelector('.user-dropdown');
    
    if (userMenu && userDropdown) {
        userMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            userDropdown.classList.toggle('show');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function() {
            userDropdown.classList.remove('show');
        });
    }
});

// Toast Notification System
function showToast(message, type = 'info') {
    // Remove existing toasts
    const existingToasts = document.querySelectorAll('.toast');
    existingToasts.forEach(toast => toast.remove());
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${getToastIcon(type)}</span>
            <span class="toast-message">${message}</span>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add toast styles if not already added
    if (!document.querySelector('#toast-styles')) {
        const styles = document.createElement('style');
        styles.id = 'toast-styles';
        styles.textContent = `
            .toast {
                position: fixed;
                top: 100px;
                right: 24px;
                background: var(--white);
                border-radius: 12px;
                padding: 16px 20px;
                box-shadow: var(--shadow-xl);
                border-left: 4px solid var(--primary);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
                min-width: 300px;
                animation: slideInRight 0.3s ease-out;
            }
            
            .toast-success {
                border-left-color: #10B981;
            }
            
            .toast-error {
                border-left-color: #EF4444;
            }
            
            .toast-warning {
                border-left-color: #F59E0B;
            }
            
            .toast-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .toast-icon {
                font-size: 18px;
            }
            
            .toast-message {
                font-size: 14px;
                font-weight: 500;
                color: var(--text-primary);
            }
            
            .toast-close {
                background: none;
                border: none;
                font-size: 20px;
                color: var(--text-muted);
                cursor: pointer;
                padding: 0;
                width: 24px;
                height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: var(--transition);
            }
            
            .toast-close:hover {
                background: var(--gray-100);
                color: var(--text-primary);
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
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(toast);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (toast.parentElement) {
            toast.style.animation = 'slideInRight 0.3s ease-out reverse';
            setTimeout(() => toast.remove(), 300);
        }
    }, 5000);
}

function getToastIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

// Search functionality
function initSearch() {
    const searchInputs = document.querySelectorAll('.search-input');
    
    searchInputs.forEach(input => {
        input.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            const cards = document.querySelectorAll('.offer-card, .category-card');
            
            cards.forEach(card => {
                const title = card.querySelector('.offer-title, .category-title')?.textContent.toLowerCase() || '';
                const description = card.querySelector('.offer-description, .category-count')?.textContent.toLowerCase() || '';
                
                if (title.includes(query) || description.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Filter functionality
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            const cards = document.querySelectorAll('.offer-card');
            
            cards.forEach(card => {
                if (filter === 'all' || card.dataset.category === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Initialize page-specific functionality
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initFilters();
    
    // Add loading screen functionality
    const loading = document.getElementById('loading');
    if (loading) {
        setTimeout(() => {
            loading.classList.add('hidden');
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Smooth scroll for anchor links
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

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Profile Page Functions
function toggleEditMode() {
    const inputs = document.querySelectorAll('#profileForm input');
    const editBtn = document.querySelector('.btn-edit');
    const saveBtn = document.querySelector('.btn-save');
    const cancelBtn = document.querySelector('.btn-cancel');
    
    inputs.forEach(input => {
        input.readOnly = !input.readOnly;
        input.style.background = input.readOnly ? 'var(--gray-100)' : 'var(--white)';
    });
    
    editBtn.style.display = editBtn.style.display === 'none' ? 'block' : 'none';
    saveBtn.style.display = saveBtn.style.display === 'none' ? 'block' : 'none';
    cancelBtn.style.display = cancelBtn.style.display === 'none' ? 'block' : 'none';
}

function cancelEdit() {
    toggleEditMode();
    // Reset form values to original
    document.getElementById('firstName').value = 'Иван';
    document.getElementById('lastName').value = 'Иванов';
    document.getElementById('email').value = 'ivan.ivanov@company.com';
    document.getElementById('phone').value = '+7 (999) 123-45-67';
    document.getElementById('company').value = 'ООО "Технологии будущего"';
    document.getElementById('position').value = 'Менеджер по развитию';
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.parentElement.querySelector('.password-toggle .eye-icon');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.textContent = '🙈';
    } else {
        input.type = 'password';
        toggle.textContent = '👁️';
    }
}

// Profile navigation
document.addEventListener('DOMContentLoaded', function() {
    const profileNavLinks = document.querySelectorAll('.profile-nav a');
    const profileSections = document.querySelectorAll('.profile-section-content');
    
    profileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            profileNavLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Hide all sections
            profileSections.forEach(section => {
                section.style.display = 'none';
            });
            
            // Show target section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });
});

// Favorites Page Functions
function removeFromFavorites(offerId) {
    const card = event.target.closest('.favorite-card');
    card.style.animation = 'fadeOut 0.3s ease-out';
    
    setTimeout(() => {
        card.remove();
        updateFavoritesCount();
        checkEmptyState();
    }, 300);
    
    showToast('Удалено из избранного', 'info');
}

function clearAllFavorites() {
    if (confirm('Вы уверены, что хотите очистить всё избранное?')) {
        const cards = document.querySelectorAll('.favorite-card');
        cards.forEach(card => {
            card.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => card.remove(), 300);
        });
        
        setTimeout(() => {
            updateFavoritesCount();
            checkEmptyState();
        }, 400);
        
        showToast('Избранное очищено', 'info');
    }
}

// Password reset modal functions
function openPasswordResetModal() {
    const modal = document.getElementById('passwordResetModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closePasswordResetModal() {
    const modal = document.getElementById('passwordResetModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function updateFavoritesCount() {
    const count = document.querySelectorAll('.favorite-card').length;
    const countElement = document.querySelector('.favorites-stats .stat-item strong');
    if (countElement) {
        countElement.textContent = count;
    }
}

function checkEmptyState() {
    const grid = document.querySelector('.favorites-grid');
    const emptyState = document.querySelector('.empty-favorites');
    const cards = document.querySelectorAll('.favorite-card');
    
    if (cards.length === 0) {
        grid.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        grid.style.display = 'grid';
        emptyState.style.display = 'none';
    }
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Public offer detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Login buttons functionality
    const loginFullBtn = document.querySelector('.btn-login-full');
    if (loginFullBtn) {
        loginFullBtn.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }

    const loginSecondaryBtn = document.querySelector('.btn-login-secondary');
    if (loginSecondaryBtn) {
        loginSecondaryBtn.addEventListener('click', function() {
            window.location.href = 'login.html';
        });
    }

    // Register link functionality
    const registerLink = document.querySelector('.register-link');
    if (registerLink) {
        registerLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Open registration modal if available, otherwise redirect to main page
            const modal = document.getElementById('registrationModal');
            if (modal) {
                modal.style.display = 'flex';
            } else {
                window.location.href = 'main.html';
            }
        });
    }

});
