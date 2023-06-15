/* eslint-disable */
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export const createPage = () => {
  const pageName = process.argv.includes('--name')
    ? process.argv[process.argv.indexOf('--name') + 1]
    : '';

  if (!pageName) {
    console.error('Название страницы не указано!');
    return;
  }

  const pageFolderPath = path.join('src', 'html', 'views');
  const pageFilePath = path.join(pageFolderPath, `${pageName}.html`);

  // Создать папку с именем страницы, если она не существует
  if (!fs.existsSync(pageFolderPath)) {
    fs.mkdirSync(pageFolderPath, { recursive: true });
  }

  // Создать файл страницы HTML
  fs.writeFileSync(pageFilePath, '');
  console.log(
    chalk.green(`\nСоздана страница '${pageName}' в папке '${pageFolderPath}'`)
  );

  // Добавить импорт в файл страницы SCSS
  const pageScssFolderPath = path.join(
    'src',
    'styles',
    'scss',
    'pages',
    `${pageName}`
  );
  const pageScssFilePath = path.join(pageScssFolderPath, `${pageName}.scss`);
  const importScssStatement = `@import "./../../config/main.scss";`;

  // Создать папку с именем страницы в SCSS, если она не существует
  if (!fs.existsSync(pageScssFolderPath)) {
    fs.mkdirSync(pageScssFolderPath, { recursive: true });
  }

  // Создать папку "sections" внутри папки страницы SCSS, если она не существует
  const sectionsFolderPath = path.join(pageScssFolderPath, 'sections');

  if (!fs.existsSync(sectionsFolderPath)) {
    fs.mkdirSync(sectionsFolderPath, { recursive: true });
    console.log(
      chalk.green(`Создана папка 'sections' внутри SCSS директории страницы`)
    );
  }

  // Создать файл страницы SCSS, если он не существует
  if (!fs.existsSync(pageScssFilePath)) {
    fs.writeFileSync(pageScssFilePath, importScssStatement);
  }

  console.log(
    chalk.green(
      `Создан SCSS файл страницы '${pageName}.scss' в директории '${pageScssFolderPath}'`
    )
  );

  // Добавить импорт в файл страницы JS
  const pageJsFolderPath = path.join('src', 'styles', 'js', 'pages');

  const pageJsFilePath = path.join(pageJsFolderPath, `${pageName}.js`);

  // Создать папку с именем страницы в JS, если она не существует
  if (!fs.existsSync(pageJsFolderPath)) {
    fs.mkdirSync(pageJsFolderPath, { recursive: true });
  }

  // Создать файл страницы JS, если он не существует
  if (!fs.existsSync(pageJsFilePath)) {
    fs.writeFileSync(pageJsFilePath, '');
  }

  console.log(
    chalk.green(
      `Создан JavaScript файл страницы '${pageName}.js' в директории '${pageJsFolderPath}\n'`
    )
  );

  return Promise.resolve();
};
