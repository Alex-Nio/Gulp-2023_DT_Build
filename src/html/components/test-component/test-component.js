import Swiper, { Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// Swiper:
new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination, Scrollbar],
  // Optional parameters
  direction: 'horizontal',
  loop: true,

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

let component = document.querySelector('.test-text');
let filename = new URL(import.meta.url).pathname.split('/');

if (component) {
  component.innerHTML = `JS файлы компонента подключены в ${
    filename[filename.length - 1]
  }`;
}

// Вычисляем фактическую ширину контейнера с учетом отступов
function getContainerWidth() {
  // Получаем объект стилей для контейнера и отступы
  let container = document.querySelector('.page__container');
  let containerWidth = container.offsetWidth;
  let containerStyles = window.getComputedStyle(container);
  let containerPaddingLeft = parseFloat(containerStyles.paddingLeft);
  let containerPaddingRight = parseFloat(containerStyles.paddingRight);
  let containerEffectiveWidth =
    containerWidth - containerPaddingLeft - containerPaddingRight;

  let containerTracker = document.querySelector('.container-tracker');

  if (containerTracker) {
    containerTracker.innerHTML = `width ${containerEffectiveWidth}px + padding ${
      containerPaddingLeft + containerPaddingRight
    }px = ${containerWidth}px`;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  getContainerWidth();
});

window.addEventListener('resize', getContainerWidth);
