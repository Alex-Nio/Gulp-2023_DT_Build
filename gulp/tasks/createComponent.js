/* eslint-disable */
import gulp from 'gulp';
import file from 'gulp-file';
import inject from 'gulp-inject-string';
import appendPrepend from 'gulp-append-prepend';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export const createComponent = () => {
  const componentName = process.argv.includes('--name')
    ? process.argv[process.argv.indexOf('--name') + 1]
    : '';
  const pageName = process.argv.includes('--page')
    ? process.argv[process.argv.indexOf('--page') + 1]
    : '';

  if (!componentName) {
    console.error('Component name is not provided!');
    return;
  }

  const componentFolderPath = `src/html/components/${componentName}`;

  // Создать папку с именем компонента
  fs.mkdirSync(componentFolderPath);

  // Создать файлы my-component.html, my-component.scss, my-component.js
  file(`${componentName}.html`, '', { src: true }).pipe(
    gulp.dest(componentFolderPath)
  );
  file(`${componentName}.scss`, '', { src: true }).pipe(
    gulp.dest(componentFolderPath)
  );
  file(`${componentName}.js`, '', { src: true }).pipe(
    gulp.dest(componentFolderPath)
  );

  // Добавить импорт стилей компонента в файл страницы
  if (pageName) {
    const pageScssFilePath = path.join(
      'src/styles/scss/pages',
      `${pageName}.scss`
    );
    const pageJsFilePath = path.join('src/styles/js/pages', `${pageName}.js`);

    // Добавить импорт стилей компонента в файл страницы
    if (pageName) {
      const pageScssFilePath = path.join(
        'src/styles/scss/pages',
        `${pageName}.scss`
      );

      // Добавить импорт в файл страницы SCSS
      if (fs.existsSync(pageScssFilePath)) {
        const pageScssContent = fs.readFileSync(pageScssFilePath, 'utf8');
        const importScssStatement = `@import '../../../html/components/${componentName}/${componentName}.scss';`;

        let updatedPageScssContent = pageScssContent;

        const importMatch = pageScssContent.match(/^@import.*?;/gm);
        if (importMatch) {
          const lastImport = importMatch[importMatch.length - 1];
          const lastImportIndex = pageScssContent.lastIndexOf(lastImport);
          updatedPageScssContent =
            updatedPageScssContent.slice(
              0,
              lastImportIndex + lastImport.length
            ) +
            `\n${importScssStatement}` +
            updatedPageScssContent.slice(lastImportIndex + lastImport.length);
        } else {
          // Если в файле SCSS нет импортов, добавить новый импорт на новую строку
          updatedPageScssContent += `${importScssStatement}`;
        }

        fs.writeFileSync(pageScssFilePath, updatedPageScssContent);
        console.log(
          chalk.green(
            `Component '${componentName}' was imported into '${pageName}.scss'.`
          )
        );
      } else {
        console.error(`Page SCSS file '${pageName}.scss' does not exist.`);
      }
    }

    // Добавить импорт в файл страницы JS
    if (fs.existsSync(pageJsFilePath)) {
      const pageJsContent = fs.readFileSync(pageJsFilePath, 'utf8');
      const importJsStatement = `import '../../../html/components/${componentName}/${componentName}.js';`;

      let updatedPageJsContent = pageJsContent;

      const importMatch = pageJsContent.match(/^import.*?;/gm);
      if (importMatch) {
        const lastImport = importMatch[importMatch.length - 1];
        const lastImportIndex = pageJsContent.lastIndexOf(lastImport);
        updatedPageJsContent =
          updatedPageJsContent.slice(0, lastImportIndex + lastImport.length) +
          `\n${importJsStatement}` +
          updatedPageJsContent.slice(lastImportIndex + lastImport.length);
      } else {
        // Если в файле JS нет импортов, добавить новый импорт на новую строку
        updatedPageJsContent += `${importJsStatement}`;
      }

      fs.writeFileSync(pageJsFilePath, updatedPageJsContent);
      console.log(
        chalk.green(
          `Component '${componentName}' was imported into '${pageName}.js'.`
        )
      );
    }
  }

  return Promise.resolve();
};