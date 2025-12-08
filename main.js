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