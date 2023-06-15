/* eslint-disable */
import fileinclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import htmlMin from 'gulp-htmlmin';
import path from 'path';
import * as glob from 'glob';

const __dirname = path.resolve();

export const html = () => {
  const pageFolders = glob.sync(`src/html/views/*/`);
  const mainFiles = pageFolders.map((folder) => {
    const folderName = path.basename(folder);
    return `${folder}/${folderName}.html`;
  });

  return app.gulp
    .src([app.path.src.html, ...mainFiles])
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: 'HTML',
          message: 'Ошибка: <%= error.message %>',
        })
      )
    )
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: path.join(__dirname, 'src/html'),
      })
    )
    .pipe(
      htmlMin({
        useShortDoctype: true,
        sortClassName: true,
        collapseWhitespace: app.isBuildMax || app.isBuildMin,
        removeComments: app.isBuildMax || app.isBuildMin,
      })
    )
    .pipe(app.plugins.replace(/@img\//g, 'images/'))
    .pipe(app.plugins.if(app.isBuildMax, webpHtmlNosvg()))
    .pipe(
      app.plugins.if(
        app.isBuild || app.isBuildOptimized || app.isBuildMin || app.isBuildMax,
        versionNumber({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: 'gulp/version.json',
          },
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
};
