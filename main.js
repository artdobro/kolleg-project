let lastScrollTop = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if (scrollTop < lastScrollTop) {
    // Прокрутка вверх
    header.classList.add('visible');
  } else {
    // Прокрутка вниз
    header.classList.remove('visible');
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Для iOS
});

document.querySelector('.star').addEventListener('click', function(event){
  event.stopPropagation();
});
document.querySelector('.film').addEventListener('click', function(event){
  if (event.target.classList.contains('star')) 
    return;
  window.location.href = './film_card.html';
});

const star = document.getElementById('starBtn');

star.addEventListener('click', () => {
  star.classList.toggle('active');
});

const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const title = document.getElementById('modalTitle');

document.querySelector('.log_in').onclick = () => {
  title.textContent = 'Вхід';
  overlay.classList.add('active');
};

document.querySelector('.sign_up').onclick = () => {
  title.textContent = 'Реєстрація';
  overlay.classList.add('active');
};

// закрытие по крестику
document.getElementById('closeModal').onclick = closeModal;

// закрытие по клику вне окна
overlay.onclick = (e) => {
  if (e.target === overlay) {
    closeModal();
  }
};

function closeModal() {
  overlay.classList.remove('active');
}