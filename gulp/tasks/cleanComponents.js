/* eslint-disable */
import gulp from 'gulp';
import filter from 'gulp-filter';
import clean from 'gulp-clean';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import * as glob from 'glob';

export function cleanComponents() {
  const componentsDir = 'src/html/components/';
  const components = fs.readdirSync(componentsDir, { withFileTypes: true });

  // Фильтры для выбора файлов компонентов
  const htmlFilter = filter('**/*.html', { restore: true });
  const jsFilter = filter('**/*.js', { restore: true });
  const scssFilter = filter('**/*.scss', { restore: true });

  function removeEmpty() {
    // Проверяем каждую папку внутри components на наличие файлов
    components.forEach((component) => {
      if (component.isDirectory()) {
        const componentPath = path.join(componentsDir, component.name);
        if (fs.existsSync(componentPath)) {
          const files = fs.readdirSync(componentPath);

          // Если папка пустая, удаляем ее
          if (files.length === 0) {
            console.log(
              chalk.red.bgBlue.bold(`Удалена пустая папка - ${componentPath}`)
            );
            fs.rmdirSync(componentPath);
          }
        }
      }
    });
  }

  return gulp
    .src(`${componentsDir}/**/*.{html,js,scss}`)
    .pipe(htmlFilter)
    .pipe(jsFilter)
    .pipe(scssFilter)
    .pipe(
      filter((file) => {
        // Фильтрация пустых файлов
        return file.stat.size !== 0;
      })
    )
    .pipe(gulp.dest(`${componentsDir}`))
    .pipe(clean({ force: true }))
    .on('error', (err) => {
      console.error(err.message);
    })
    .on('end', () => {
      // Выводим список компонентов
      const components = fs.readdirSync('src/html/components');
      console.log(chalk.red('Components:'));
      components.forEach((component) => {
        console.log(`- ${component}`);
      });
    })
    .on('finish', () => {
      gulp
        .src(`${componentsDir}/**/*.{html,js,scss}`)
        .pipe(
          filter((file) => {
            // Фильтрация пустых файлов
            return file.stat.size == 0;
          })
        )
        .pipe(clean({ force: true }))
        .on('data', (file) => {
          console.log(
            chalk.red.bgYellow.bold(`Удален пустой файл - ${file.path}`)
          );
        })
        .on('end', () => {
          // Выводим список компонентов
          const components = fs.readdirSync('src/html/components');
          console.log(chalk.red('Components:'));
          components.forEach((component) => {
            console.log(`- ${component}`);
          });

          // Поиск и удаление неиспользуемых импортов в файлах страниц
          const pageFiles = glob.sync('src/styles/scss/pages/**/*.scss');
          pageFiles.forEach((pageFile) => {
            const pageContent = fs.readFileSync(pageFile, 'utf8');
            let updatedPageContent = pageContent;

            // Регулярное выражение для поиска импортов компонентов с расширением .scss
            const scssImportRegex =
              /@import\s+(["'])\.\.\/\.\.\/\.\.\/html\/components\/([\w-]+)\/([\w-]+)\.scss\1;/g;
            updatedPageContent = updatedPageContent.replace(
              scssImportRegex,
              (match, p1, component, file) => {
                const componentPath = path.join(
                  'src',
                  'html',
                  'components',
                  component,
                  `${file}.scss`
                );
                if (fs.existsSync(componentPath)) {
                  return match;
                } else {
                  console.log(
                    chalk.red.bgYellow.bold(`Удален импорт - ${match}`)
                  );
                  return '';
                }
              }
            );

            fs.writeFileSync(pageFile, updatedPageContent);
          });

          // Поиск и удаление неиспользуемых импортов в файлах JavaScript страниц
          const jsPageFiles = glob.sync('src/styles/js/pages/**/*.js');
          jsPageFiles.forEach((jsPageFile) => {
            const jsPageContent = fs.readFileSync(jsPageFile, 'utf8');
            let updatedJsPageContent = jsPageContent;

            // Регулярное выражение для поиска импортов компонентов с расширением .js
            const jsImportRegex =
              /import\s+\{[^}]+\}\s+from\s+'(\.\.\/)*html\/components\/([\w-]+)\/([\w-]+)\.js';/g;
            updatedJsPageContent = updatedJsPageContent.replace(
              jsImportRegex,
              (match, relativePath, component, file) => {
                const componentPath = path.join(
                  'src',
                  'html',
                  'components',
                  component,
                  `${file}.js`
                );
                if (fs.existsSync(componentPath)) {
                  return match;
                } else {
                  console.log(
                    chalk.red.bgYellow.bold(`Удален импорт - ${match}`)
                  );
                  return '';
                }
              }
            );

            fs.writeFileSync(jsPageFile, updatedJsPageContent);
          });
        })
        .on('data', () => {
          removeEmpty();
        });
    });
}
