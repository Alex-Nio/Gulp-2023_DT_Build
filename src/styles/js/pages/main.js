import Swiper from 'swiper';
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { variables } from '../core/variables'; // Переменные
import { functions } from '../core/exports'; // Функции

// Пример вызова функции
const time = functions.getCurrentTime();

// Пример деструктуризации с одной переменной
const { helloWorld } = variables;

// Swiper init:
new Swiper('.swiper', {
  modules: [Navigation, Pagination, Scrollbar],
  direction: 'horizontal',
  loop: true,
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  scrollbar: {
    el: '.swiper-scrollbar',
  },
});

console.log(time);
console.log(helloWorld);

document.addEventListener('DOMContentLoaded', function () {
  functions.getContainerWidth();
});

window.addEventListener('resize', functions.getContainerWidth);
