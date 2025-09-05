// Acordeón: Mostrar/Ocultar contenido
function toggleAccordion(id) {
  const content = document.getElementById(id);
  const button = content.previousElementSibling;

  if (content.classList.contains('show')) {
    content.classList.remove('show');
    button.textContent = 'Mostrar más';
  } else {
    content.classList.add('show');
    button.textContent = 'Ocultar';
  }
}

// Popup de producto
function openPopup(imgSrc, title, desc) {
  const popupImage = document.getElementById('popupImage');
  const popupTitle = document.getElementById('popupTitle');
  const popupDescription = document.getElementById('popupDescription');
  const popup = document.getElementById('imagePopup');

  // Reiniciar zoom
  popupImage.classList.remove('zoomed');
  popupImage.style.cursor = 'zoom-in';

  // Mostrar popup
  popup.style.display = 'flex';
  document.body.style.overflow = 'hidden';

  // Vaciar src antes para forzar recarga
  popupImage.src = '';

  // Asignar nuevos datos
  popupTitle.textContent = title;
  popupDescription.textContent = desc;

  // Asignar la imagen
  popupImage.onload = function () {
    console.log('Imagen cargada:', imgSrc);
  };

  popupImage.onerror = function () {
    console.error('Error al cargar la imagen:', imgSrc);
    popupImage.src = 'imagen-no-disponible.jpg'; // Imagen de respaldo
  };

  popupImage.src = imgSrc;
}

function closePopup() {
  document.getElementById('imagePopup').style.display = 'none';
  document.body.style.overflow = 'auto';
}

// Cerrar popup de producto al hacer clic fuera
document.getElementById('imagePopup').addEventListener('click', function (e) {
  if (e.target === this) {
    closePopup();
  }
});

// Cerrar con Escape
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closePopup();
  }
});

// Popup de bienvenida - Solo se muestra si no se ha cerrado antes
window.onload = function () {
  const welcomePopup = document.getElementById('welcomePopup');

  // Mostrar solo si no se ha cerrado en una visita anterior
  if (!localStorage.getItem('popupClosed')) {
    welcomePopup.style.display = 'flex';

    // Cerrar automáticamente después de 3 segundos
    setTimeout(function () {
      welcomePopup.style.animation = 'fadeOut 0.3s ease forwards';
      localStorage.setItem('popupClosed', 'true'); // Marcar como visto

      // Eliminar del DOM después de la animación
      setTimeout(function () {
        welcomePopup.style.display = 'none';
      }, 300);
    }, 3000);
  } else {
    welcomePopup.style.display = 'none';
  }
};

// Cerrar popup de bienvenida manualmente
function closeWelcomePopup() {
  const welcomePopup = document.getElementById('welcomePopup');
  welcomePopup.style.animation = 'fadeOut 0.3s ease forwards';
  localStorage.setItem('popupClosed', 'true');

  setTimeout(function () {
    welcomePopup.style.display = 'none';
  }, 300);
}

// Zoom en la imagen del popup (clic para acercar/alejar)
document.getElementById('popupImage').addEventListener('click', function () {
  if (this.classList.contains('zoomed')) {
    this.classList.remove('zoomed');
    this.style.cursor = 'zoom-in';
  } else {
    this.classList.add('zoomed');
    this.style.cursor = 'zoom-out';
  }
});