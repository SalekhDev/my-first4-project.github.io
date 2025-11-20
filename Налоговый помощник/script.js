// Calculator functionality
document.getElementById('calculate-ndfl').addEventListener('click', function() {
    const income = parseFloat(document.getElementById('income').value) || 0;
    const rate = parseFloat(document.getElementById('ndfl-rate').value) || 13;
    
    const tax = income * (rate / 100);
    const net = income - tax;
    
    document.getElementById('result-income').textContent = income.toLocaleString('ru-RU') + ' руб.';
    document.getElementById('result-tax').textContent = tax.toLocaleString('ru-RU') + ' руб.';
    document.getElementById('result-net').textContent = net.toLocaleString('ru-RU') + ' руб.';
    
    document.getElementById('ndfl-result').style.display = 'block';
});

// Tab functionality for calculators
const tabBtns = document.querySelectorAll('.tab-btn');
tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        // Remove active class from all tabs
        tabBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked tab
        this.classList.add('active');
        // Here you would switch calculator forms
        // For this example, we'll just update the title
        document.querySelector('.calculator-content h3').textContent = this.textContent + ' калькулятор';
    });
});

// Personal account tabs
const accountTabs = document.querySelectorAll('.account-sidebar li');
const accountSections = document.querySelectorAll('.account-section');

accountTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Remove active class from all tabs and sections
        accountTabs.forEach(t => t.classList.remove('active'));
        accountSections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding section
        this.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Search functionality
document.querySelector('.search-box button').addEventListener('click', function() {
    const searchTerm = document.querySelector('.search-box input').value;
    if (searchTerm.trim() !== '') {
        alert('Поиск по запросу: ' + searchTerm);
        // Здесь будет реализация поиска по базе знаний
    }
});

// Dropdown menu functionality for mobile
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const content = this.querySelector('.dropdown-content');
                content.style.display = content.style.display === 'block' ? 'none' : 'block';
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            dropdowns.forEach(dropdown => {
                if (!dropdown.contains(e.target)) {
                    dropdown.querySelector('.dropdown-content').style.display = 'none';
                }
            });
        }
    });
});

// Main CTA buttons functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hero section buttons
    const calculateTaxesBtn = document.querySelector('.hero-buttons .btn-accent');
    const getConsultationBtn = document.querySelector('.hero-buttons .btn-secondary:nth-child(2)');
    const prepareDocumentsBtn = document.querySelector('.hero-buttons .btn-secondary:nth-child(3)');
    
    if (calculateTaxesBtn) {
        calculateTaxesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to calculators section
            document.querySelector('.calculators').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    if (getConsultationBtn) {
        getConsultationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Show consultation modal or scroll to knowledge base
            alert('Функция консультации будет доступна после регистрации в личном кабинете');
            document.querySelector('.auth-buttons .btn-primary').click();
        });
    }
    
    if (prepareDocumentsBtn) {
        prepareDocumentsBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Scroll to personal account section
            document.querySelector('.personal-account').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    // Auth buttons functionality
    const loginBtn = document.querySelector('.auth-buttons .btn-secondary');
    const registerBtn = document.querySelector('.auth-buttons .btn-primary');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showAuthModal('login');
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showAuthModal('register');
        });
    }
    
    // Navigation smooth scroll
    const navLinks = document.querySelectorAll('.nav-links a[href="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            } else {
                // Default behavior for demo
                alert('Навигация по разделам работает в демонстрационном режиме');
            }
        });
    });
    
    // Add data-target attributes to nav links for demo
    document.querySelector('.nav-links a[href="#"]').setAttribute('data-target', 'features');
    document.querySelectorAll('.dropdown-content a').forEach(link => {
        link.setAttribute('data-target', 'knowledge-base');
    });
});

// Auth modal functionality
function showAuthModal(type) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'auth-modal';
    modal.style.cssText = `
        background: white;
        padding: 30px;
        border-radius: 8px;
        width: 90%;
        max-width: 400px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    `;
    
    if (type === 'login') {
        modal.innerHTML = `
            <h3>Вход в личный кабинет</h3>
            <form id="login-form">
                <div class="form-group">
                    <label for="login-email">Email</label>
                    <input type="email" id="login-email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="login-password">Пароль</label>
                    <input type="password" id="login-password" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 15px;">Войти</button>
            </form>
            <p style="text-align: center; margin-top: 15px;">
                Нет аккаунта? <a href="#" id="switch-to-register">Зарегистрироваться</a>
            </p>
            <button class="btn btn-secondary" style="width: 100%; margin-top: 10px;" onclick="closeModal()">Отмена</button>
        `;
    } else {
        modal.innerHTML = `
            <h3>Регистрация</h3>
            <form id="register-form">
                <div class="form-group">
                    <label for="reg-name">ФИО</label>
                    <input type="text" id="reg-name" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="reg-email">Email</label>
                    <input type="email" id="reg-email" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="reg-password">Пароль</label>
                    <input type="password" id="reg-password" class="form-control" required>
                </div>
                <div class="form-group">
                    <label for="reg-confirm-password">Подтвердите пароль</label>
                    <input type="password" id="reg-confirm-password" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 15px;">Зарегистрироваться</button>
            </form>
            <p style="text-align: center; margin-top: 15px;">
                Уже есть аккаунт? <a href="#" id="switch-to-login">Войти</a>
            </p>
            <button class="btn btn-secondary" style="width: 100%; margin-top: 10px;" onclick="closeModal()">Отмена</button>
        `;
    }
    
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    
    // Form submission
    const form = modal.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (type === 'login') {
                alert('Вход выполнен успешно! В демо-режиме функционал ограничен.');
            } else {
                alert('Регистрация завершена! В демо-режиме функционал ограничен.');
            }
            closeModal();
        });
    }
    
    // Switch between login and register
    const switchLink = modal.querySelector('#switch-to-register') || modal.querySelector('#switch-to-login');
    if (switchLink) {
        switchLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal();
            showAuthModal(type === 'login' ? 'register' : 'login');
        });
    }
    
    // Close modal when clicking outside
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closeModal();
        }
    });
}

function closeModal() {
    const overlay = document.querySelector('.modal-overlay');
    if (overlay) {
        document.body.removeChild(overlay);
    }
}

// Feature cards interaction
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const featureTitle = this.querySelector('h3').textContent;
            alert(`Вы выбрали: ${featureTitle}. В полной версии система перенаправит вас в соответствующий раздел.`);
        });
    });
    
    // Category cards interaction
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const categoryTitle = this.querySelector('h3').textContent;
            alert(`Раздел: ${categoryTitle}. В полной версии откроется база знаний по выбранной теме.`);
        });
    });
});