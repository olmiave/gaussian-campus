//SLIDES INICIO
let slideIndex = 0;
let slideCycleCount = 0;
let slideshowRunning = true;

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    let startTourButton = document.getElementById("startTourButton");
    let logoContainer = document.getElementById("logoContainer");
    let slideshowContainer = document.querySelector('.slideshow-container'); // Contenedor del slideshow

    // Ocultar todas las diapositivas
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        slides[i].style.opacity = 0; // Aseguramos que la opacidad inicie en 0
    }

    slideIndex++;

    // Reiniciar el índice si supera el número de diapositivas
    if (slideIndex > slides.length) {
        slideIndex = 1;  // Reiniciar al primer índice
        slideCycleCount++;
    }

    // Mostrar la diapositiva actual
    slides[slideIndex - 1].style.display = "block";
    slides[slideIndex - 1].style.opacity = 1; // Hacer visible la diapositiva actual

    // Revisar si la diapositiva actual es un video y controlarlo
    let currentSlide = slides[slideIndex - 1].querySelector("video");
    if (currentSlide) {
        currentSlide.play(); // Reproduce el video si es un video
        currentSlide.onended = function() {
            if (slideshowRunning) {
                setTimeout(() => {
                    fadeOutCurrentSlide(slides[slideIndex - 1]); // Desvanecer la diapositiva actual
                }, 0);
            }
        };
    } else {
        setTimeout(() => {
            if (slideshowRunning) {
                // No hacer fade out si es la última diapositiva
                if (slideIndex === slides.length) {
                    keepLastImage(); // Mantener la última imagen visible
                    // Mostrar el botón y el logo después de un ciclo completo
                    showFinalElements(startTourButton, logoContainer, slideshowContainer);
                } else {
                    fadeOutCurrentSlide(slides[slideIndex - 1]); // Desvanecer la diapositiva actual
                }
            }
        }, 3000); // Mantener las imágenes durante 3 segundos
    }
}

// Función para desvanecer la diapositiva actual antes de mostrar la siguiente
function fadeOutCurrentSlide(currentSlide) {
    currentSlide.style.opacity = 1; // Aseguramos que la opacidad inicie en 1
    let fadeEffect = setInterval(() => {
        if (currentSlide.style.opacity > 0) {
            currentSlide.style.opacity -= 0.1; // Reducir la opacidad
        } else {
            clearInterval(fadeEffect); // Detener el efecto de desvanecimiento
            currentSlide.style.display = "none"; // Ocultar la diapositiva
            showSlides(); // Mostrar la siguiente diapositiva
        }
    }, 120);
}

// Función para mostrar el botón, el logo y la capa oscura
function showFinalElements(startTourButton, logoContainer, slideshowContainer) {
    startTourButton.style.display = "block";
    logoContainer.style.display = "block";

    setTimeout(() => {
        startTourButton.style.opacity = "1";
        logoContainer.style.opacity = "1";
    }, 100);

    // Aplicar el blur en el contenedor del slideshow
    slideshowContainer.classList.add("blurred");
}

// Mantener la última imagen visible cuando se detiene el slideshow
function keepLastImage() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        if (i !== slideIndex - 1) {
            slides[i].style.display = "none"; // Ocultar todas las diapositivas excepto la última
        }
    }
}

//BOTON DE COMENZAR RECORRIDO
function startTour() {
    window.location.href = "cargar.html?destino=lobby.html"; // Redirigir a la página de destino del recorrido
}

// Iniciar el slideshow al cargar la página
window.onload = function() {
    showSlides();
};

//FIN SLIDES DEL PRINCIPIO

//BOTON DE INSTRUCCIONES
/* Open */
function openNav() {
  const nav = document.getElementById("myNav");
  nav.style.width = "100%";  // Cambia el ancho de inmediato
  nav.classList.add("show"); // Agrega la clase para el fade-in
}

/* Close */
function closeNav() {
  const nav = document.getElementById("myNav");
  nav.classList.remove("show"); // Quita la clase para el fade-out

  // Espera que la transición de opacidad termine, luego ajusta el ancho
  setTimeout(() => {
      nav.style.width = "0"; // Establece el ancho en 0 después del fade-out
  }, 500); // Duración de la transición (0.5 segundos)
}

//ONBOARDING 
let currentStep = 0;
const steps = document.querySelectorAll('.onboarding-step');

function showStep(step) {
    steps.forEach((s, index) => {
        s.style.display = index === step ? 'block' : 'none';
    });
    if (step == steps){
        document.getElementById('nextButton').innerText = 'Finalizar'
    }
    updateButtons();
}

function updateButtons() {
    document.getElementById('prevButton').style.display = currentStep === 0 ? 'none' : 'inline-block';
    document.getElementById('nextButton').style.display = currentStep === steps.length - 1 ? 'none' : 'inline-block';
}

document.getElementById('prevButton').onclick = function() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
};

// Al hacer clic en "Finalizar"
document.getElementById('nextButton').onclick = function() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    } else {
        // Mostrar el recuadro de tips y minimizar el onboarding
        document.getElementById('tips').style.display = 'block';
        document.getElementById('onboardingPanel').style.display = 'none';
    }
};

// Al hacer clic en "Saltear"
function skipOnboarding() {
    document.getElementById('tips').style.display = 'block';
    document.getElementById('onboardingPanel').style.display = 'none';
}


// Función para minimizar o maximizar el panel de consejos
function toggleTips() {
    const tipsPanel = document.getElementById('tips');
    const toggleButton = document.getElementById("toggleTipsButton");

    // Cambiar la clase 'minimized'
    tipsPanel.classList.toggle('minimized');

    // Cambiar el texto del botón según el estado del panel
    if (tipsPanel.classList.contains('minimized')) {
        toggleButton.innerText = "Abrir";
    } else {
        toggleButton.innerText = "Cerrar";
    }
}
// Mostrar el primer paso al cargar la página
showStep(currentStep);