document.addEventListener('DOMContentLoaded', function() {

  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
  
  });

/* Quando o usuário scrolla para baixo, esconde a barra de navegação.
Quando o usuŕio scrolla para cima, mostra a barra de navegação */
let prevScrollpos = window.scrollY;
window.onscroll = function(){
  let currentScrollPos = window.scrollY;
  prevScrollpos > currentScrollPos ? document.getElementById("AppHeader").style.top = "0" : document.getElementById("AppHeader").style.top = "-50px";
  prevScrollpos = currentScrollPos;
}
