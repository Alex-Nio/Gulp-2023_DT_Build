let component = document.querySelector('.test-component2');

let filename = new URL(import.meta.url).pathname.split('/');

component.innerHTML = `JS файлы компонента подключены в ${
  filename[filename.length - 1]
}`;
