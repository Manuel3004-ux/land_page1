
const backToTop = document.querySelector('.back-to-top');


window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
   
    backToTop.style.display = 'block';
  } else {
    
    backToTop.style.display = 'none';
  }
});


window.onscroll = function() {
  updateProgressBar();
};

function updateProgressBar() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("progressBar").style.width = scrolled + "%";
}

document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('scroll-top-btn');
  const circle = document.querySelector('.progress-ring__path');
  const radius = circle.r.baseVal.value;
  const circumference = radius * 2 * Math.PI;

  // Establecer el largo total del círculo
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = circumference;

  function setProgress(percent) {
      const offset = circumference - (percent / 100 * circumference);
      circle.style.strokeDashoffset = offset;
  }

  function handleScroll() {
      // Calcular el progreso del scroll
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      
      // Actualizar el círculo de progreso
      setProgress(progress);

      // Mostrar/ocultar el botón
      if (window.scrollY > 300) {
          button.classList.add('visible');
      } else {
          button.classList.remove('visible');
      }
  }

  // Manejar el clic en el botón
  button.addEventListener('click', function() {
      window.scrollTo({
          top: 0,
          behavior: 'smooth'
      });
  });

  // Escuchar el evento scroll
  window.addEventListener('scroll', handleScroll);
});



