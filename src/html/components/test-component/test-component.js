let component = document.querySelector('.test-text');
let filename = new URL(import.meta.url).pathname.split('/');

component.innerHTML = `JS файлы компонента подключены в ${
  filename[filename.length - 1]
}`;

function getContainerWidth() {
  let container = document.querySelector('.page__container');
  let containerWidth = container.offsetWidth;

  // Получаем объект стилей для контейнера
  let containerStyles = window.getComputedStyle(container);

  // Получаем значения отступов (padding) контейнера
  let containerPaddingLeft = parseFloat(containerStyles.paddingLeft);
  let containerPaddingRight = parseFloat(containerStyles.paddingRight);

  // Вычисляем фактическую ширину контейнера с учетом отступов
  let containerEffectiveWidth =
    containerWidth - containerPaddingLeft - containerPaddingRight;

  let containerTracker = document.querySelector('.container-tracker');
  containerTracker.innerHTML = `width ${containerEffectiveWidth}px + padding ${
    containerPaddingLeft + containerPaddingRight
  }px = ${containerWidth}px`;
}

document.addEventListener('DOMContentLoaded', function () {
  getContainerWidth();
});

window.addEventListener('resize', getContainerWidth);
