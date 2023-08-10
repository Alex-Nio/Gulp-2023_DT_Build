// Экспортируемые функции
export const functions = {
  getCurrentTime() {
    const currentTime = new Date();
    return currentTime;
  },
  // Вычисляем фактическую ширину контейнера с учетом отступов
  getContainerWidth() {
    const container = document.querySelector('.test-section__container');
    const containerTracker = document.querySelector('.container-tracker');

    if (!container || !containerTracker) {
      return;
    }

    const { paddingLeft, paddingRight } = window.getComputedStyle(container);
    const containerEffectiveWidth =
      container.offsetWidth -
      parseFloat(paddingLeft) -
      parseFloat(paddingRight);

    containerTracker.style.color = 'teal';
    containerTracker.innerHTML = `width ${containerEffectiveWidth}px + padding ${
      parseFloat(paddingLeft) + parseFloat(paddingRight)
    }px = ${container.offsetWidth}px`;
  },
};
