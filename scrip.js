// Función para cambiar entre pestañas del menú
function showTab(tabName) {
    // Ocultar todos los tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Remover clase active de todos los botones
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Mostrar el tab seleccionado
    const selectedTab = document.getElementById(tabName);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // Agregar clase active al botón clickeado
    event.target.classList.add('active');
}

// Función para manejar el scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Cerrar menú móvil si está abierto
            closeMenuMobile();
        }
    });
});

// Función para activar el primer tab por defecto
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar el primer tab (Nuestras Tapas) por defecto
    const firstTab = document.getElementById('tapas');
    if (firstTab) {
        firstTab.classList.add('active');
    }

    // Activar el primer botón
    const firstButton = document.querySelector('.tab-button');
    if (firstButton) {
        firstButton.classList.add('active');
    }

    // Efecto de animación en los elementos al cargar
    animateOnScroll();

    // Inicializar menú móvil
    initMobileMenu();
});

// Función para animar elementos cuando entran en vista
function animateOnScroll() {
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

    // Observar tarjetas
    document.querySelectorAll('.highlight-card, .menu-item, .review-card, .info-box').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Función para inicializar el menú móvil
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Cerrar menú al hacer click en un enlace
    if (navLinks) {
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                if (menuToggle) {
                    menuToggle.classList.remove('active');
                }
            });
        });
    }
}

// Función para cerrar menú móvil
function closeMenuMobile() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.getElementById('menuToggle');
    if (navLinks) {
        navLinks.classList.remove('active');
    }
    if (menuToggle) {
        menuToggle.classList.remove('active');
    }
}

// Detectar si es dispositivo móvil
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Optimizar para touch en móviles
if (isMobileDevice()) {
    document.body.classList.add('mobile-device');
    
    // Aumentar el área de toque de los botones
    document.querySelectorAll('.btn, .tab-button, .social-badge').forEach(element => {
        element.style.minHeight = '44px'; // Estándar de accesibilidad móvil
    });
}

// Efecto de hover en los botones (solo en desktop)
if (!isMobileDevice()) {
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Función para rastrear el scroll y cambiar el estilo de la navbar
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
    }
});

// Función para validar y enviar formularios (si se agrega en el futuro)
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Aquí iría la lógica de validación
            console.log('Formulario enviado');
        });
    }
}

// Función para copiar información de contacto
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('¡Copiado al portapapeles!');
    }).catch(function(err) {
        console.error('Error al copiar:', err);
    });
}

// Función para inicializar tooltips si se necesitan en el futuro
function initTooltips() {
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.position = 'fixed';
            tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
            tooltip.style.left = (rect.left + rect.width / 2 - tooltip.offsetWidth / 2) + 'px';
        });

        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Optimizar imágenes para móviles
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        // Lazy loading
        img.loading = 'lazy';
    });
});

// Prevenir zoom no deseado en inputs
document.addEventListener('touchstart', function(e) {
    if (e.target.tagName.toLowerCase() === 'input' || e.target.tagName.toLowerCase() === 'textarea') {
        e.target.style.fontSize = '16px';
    }
}, false);
