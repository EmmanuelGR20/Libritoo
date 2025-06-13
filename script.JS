let currentPage = 1;
const totalPages = 20;
let musicPlaying = false;

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    showPage(1);
    createParticles();
    updateNavigation();
    
    // Intentar reproducir música automáticamente
    setTimeout(() => {
        const audio = document.getElementById('background-music');
        audio.play().then(() => {
            musicPlaying = true;
            updateMusicButton();
        }).catch(() => {
            // Auto-play no permitido, mantener botón para que usuario pueda activar
            musicPlaying = false;
            updateMusicButton();
        });
    }, 1000);
});

// Mostrar página específica
function showPage(pageNumber) {
    // Ocultar todas las páginas
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Mostrar página actual con animación
    const currentPageElement = document.querySelector(`[data-page="${pageNumber}"]`);
    if (currentPageElement) {
        setTimeout(() => {
            currentPageElement.classList.add('active');
        }, 100);
    }
    
    currentPage = pageNumber;
    updateNavigation();
    updatePageIndicator();
    
    // Efectos especiales para ciertas páginas
    if (pageNumber === 1) {
        createSparkles();
    }
}

// Navegación
function nextPage() {
    if (currentPage < totalPages) {
        addPageTurnEffect();
        setTimeout(() => {
            showPage(currentPage + 1);
        }, 400);
    }
}

function previousPage() {
    if (currentPage > 1) {
        addPageTurnEffect();
        setTimeout(() => {
            showPage(currentPage - 1);
        }, 400);
    }
}

// Efecto de voltear página
function addPageTurnEffect() {
    const currentPageElement = document.querySelector(`[data-page="${currentPage}"]`);
    if (currentPageElement) {
        currentPageElement.classList.add('turning');
        setTimeout(() => {
            currentPageElement.classList.remove('turning');
        }, 800);
    }
}

// Actualizar navegación
function updateNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

// Actualizar indicador de página
function updatePageIndicator() {
    const indicator = document.getElementById('page-indicator');
    indicator.textContent = `${currentPage} / ${totalPages}`;
}

// Control de música
function toggleMusic() {
    const audio = document.getElementById('background-music');
    
    if (musicPlaying) {
        audio.pause();
        musicPlaying = false;
    } else {
        audio.play().then(() => {
            musicPlaying = true;
        }).catch(console.error);
    }
    
    updateMusicButton();
}

function updateMusicButton() {
    const button = document.getElementById('music-toggle');
    const icon = button.querySelector('i');
    
    if (musicPlaying) {
        icon.className = 'fas fa-music';
        button.style.animation = 'pulse 2s infinite';
    } else {
        icon.className = 'fas fa-music';
        button.style.animation = 'none';
        button.style.opacity = '0.7';
    }
}

// Crear partículas de corazones
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    
    setInterval(() => {
        if (Math.random() < 0.3) {
            createHeartParticle(particlesContainer);
        }
    }, 1000);
}

function createHeartParticle(container) {
    const hearts = ['💖', '💕', '💝', '💗', '💞', '💓', '🌸', '🌺'];
    const heart = document.createElement('div');
    heart.className = 'particle';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    
    // Posición aleatoria
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.opacity = Math.random() * 0.6 + 0.4;
    heart.style.fontSize = (Math.random() * 10 + 15) + 'px';
    
    container.appendChild(heart);
    
    // Remover después de la animación
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 8000);
}

// Crear destellos para la portada
function createSparkles() {
    const book = document.querySelector('.book');
    
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.position = 'absolute';
            sparkle.style.left = Math.random() * 80 + 10 + '%';
            sparkle.style.top = Math.random() * 80 + 10 + '%';
            sparkle.style.fontSize = '24px';
            sparkle.style.animation = 'sparkle 2s ease-out forwards';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '10';
            
            book.appendChild(sparkle);
            
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }, i * 300);
    }
}

// Agregar animación de destello
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
        }
        50% {
            opacity: 1;
            transform: scale(1.2) rotate(180deg);
        }
        100% {
            opacity: 0;
            transform: scale(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style);

// Navegación con teclado
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextPage();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousPage();
    }
});

// Navegación táctil para móviles
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe izquierda - página siguiente
            nextPage();
        } else {
            // Swipe derecha - página anterior
            previousPage();
        }
    }
}

// Efectos de hover mejorados
document.addEventListener('DOMContentLoaded', function() {
    // Agregar efectos a las imágenes
    const fotos = document.querySelectorAll('.foto');
    fotos.forEach(foto => {
        foto.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1) saturate(1.2)';
        });
        
        foto.addEventListener('mouseleave', function() {
            this.style.filter = 'none';
        });
    });
    
    // Efectos en las razones
    const razones = document.querySelectorAll('.razon');
    razones.forEach((razon, index) => {
        razon.style.animationDelay = (index * 0.1) + 's';
    });
});

// Función para manejar errores de carga de imágenes
document.addEventListener('DOMContentLoaded', function() {
    const fotos = document.querySelectorAll('.foto');
    fotos.forEach((foto, index) => {
        foto.addEventListener('error', function() {
            // Si la imagen no carga, mostrar un placeholder bonito
            this.style.background = 'linear-gradient(135deg, #ffe0f0, #ffcce7)';
            this.style.display = 'flex';
            this.style.alignItems = 'center';
            this.style.justifyContent = 'center';
            this.style.color = '#d63384';
            this.style.fontSize = '48px';
            this.innerHTML = '💕';
            this.alt = 'Imagen de amor';
        });
    });
});
