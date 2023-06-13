/* eslint-disable */
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export const createPage = () => {
  const pageName = process.argv.includes('--name')
    ? process.argv[process.argv.indexOf('--name') + 1]
    : '';

  if (!pageName) {
    console.error('Page name is not provided!');
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

  // Добавить импорт в файл страницы SCSS
  const pageScssFolderPath = path.join('src', 'styles', 'scss', 'pages');
  const pageScssFilePath = path.join(pageScssFolderPath, `${pageName}.scss`);
  const importScssStatement = `@import "./../config/main.scss";`;

  // Создать папку с именем страницы в SCSS, если она не существует
  if (!fs.existsSync(pageScssFolderPath)) {
    fs.mkdirSync(pageScssFolderPath, { recursive: true });
  }

  // Создать файл страницы SCSS, если он не существует
  if (!fs.existsSync(pageScssFilePath)) {
    fs.writeFileSync(pageScssFilePath, importScssStatement);
  }

  console.log(chalk.green(`Import statement added to '${pageName}.scss'`));

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

  console.log(chalk.green(`Import statement added to '${pageName}.js'`));

  return Promise.resolve();
};
