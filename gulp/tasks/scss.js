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

export const scss = () => {
  const pageFolders = glob.sync(`src/styles/scss/pages/*/`);
  const mainFiles = pageFolders.map((folder) => {
    const folderName = path.basename(folder);
    return `${folder}/${folderName}.scss`;
  });

  return (
    app.gulp
      .src(mainFiles, { sourcemaps: app.isBuildDefault })
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
            grid: true,
            overrideBrowserslist: ['last 3 versions'],
            cascade: true,
          })
        )
      )
      // Расскомментировать если нужен обычный дубль файла стилей
      .pipe(app.gulp.dest(app.path.build.css))
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
