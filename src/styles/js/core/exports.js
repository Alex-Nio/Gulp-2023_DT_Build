// Экспортируемые функции
export const functions = {
  getCurrentTime() {
    const currentTime = new Date();
    return currentTime;
  },
  getContainerWidth() {
    const container = document.querySelector('.test-section__container');
    console.log(container.getPropertyValue('padding-left'));
    console.log(container.getPropertyValue('padding-right'));
    console.log(container.offsetWidth);
  },
};
