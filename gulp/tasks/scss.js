/* eslint-disable */
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import webpcss from 'gulp-webpcss'; // Вывод WEBP изображений
import autoPrefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа запросов
import path from 'path';
import * as glob from 'glob';
const sass = gulpSass(dartSass);
import fs from 'fs';
let isFirstBuild = true;

export const scss = () => {
  console.log('Первичный запуск SCSS компиляции:', isFirstBuild);

  const pageFolders = glob.sync(`src/styles/scss/pages/*/`);

  const mainFiles = pageFolders.map((folder) => {
    const folderName = path.basename(folder);
    return `${folder}/${folderName}.scss`;
  });

  const latestModifiedFile = mainFiles.reduce((latestFile, currentFile) => {
    const currentModifiedTime = fs.statSync(currentFile).mtime;
    if (!latestFile || currentModifiedTime > latestFile.modifiedTime) {
      return {
        filePath: currentFile,
        modifiedTime: currentModifiedTime,
      };
    }
    return latestFile;
  }, null);

  let filesToCompile = mainFiles;

  if (!isFirstBuild) {
    // Если не первый запуск, компилировать только последний измененный файл
    filesToCompile = [latestModifiedFile.filePath];
  }

  isFirstBuild = false;

  // console.log(mainFiles, 'файлы');
  // console.log(latestModifiedFile, 'Последний измененный файл');

  return (
    app.gulp
      .src(filesToCompile, { sourcemaps: app.isBuildDefault })
      .pipe(
        app.plugins.plumber(
          app.plugins.notify.onError({
            title: 'SCSS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      .pipe(app.plugins.replace(/@img\//g, '../images/'))
      .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(
        app.plugins.if(
          app.isBuildDefault ||
            app.isBuildMax ||
            app.isBuildMin ||
            app.isBuildOptimized,
          groupCssMediaQueries()
        )
      )
      .pipe(
        app.plugins.if(
          app.isBuildMax || app.isBuildOptimized,
          webpcss({
            webpClass: '.webp',
            noWebpClass: '.no-webp',
          })
        )
      )
      .pipe(
        app.plugins.if(
          app.isBuildDefault ||
            app.isBuildMax ||
            app.isBuildMin ||
            app.isBuildOptimized,
          autoPrefixer({
            grid: false,
            overrideBrowserslist: ['last 10 versions'],
            cascade: true,
          })
        )
      )
      // Расскомментировать если нужен обычный дубль файла стилей
      // .pipe(app.gulp.dest(app.path.build.css))
      .pipe(
        app.plugins.if(
          app.isBuildDefault ||
            app.isBuildMax ||
            app.isBuildMin ||
            app.isBuildOptimized,
          cleanCss()
        )
      )
      .pipe(
        rename((file) => {
          file.dirname = ''; // Удаляем имя папки
          file.extname = '.min.css'; // Меняем расширение файла
        })
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(app.plugins.browserSync.stream())
  );
};
