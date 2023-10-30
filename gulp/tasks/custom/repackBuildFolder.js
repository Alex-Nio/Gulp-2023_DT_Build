/*eslint no-undef: "off"*/
import { plugins } from '../../config/plugins.js';

export const repackBuildFolder = (done) => {
  // Переместим папки из IGNORE в родительские папки
  const moveHTML = () => {
    return app.gulp
      .src('src/html/views/#BUILD/**')
      .pipe(app.gulp.dest('src/html/views/'));
  };

  const moveSCSS = () => {
    return app.gulp
      .src('src/styles/scss/pages/#BUILD/**')
      .pipe(app.gulp.dest('src/styles/scss/pages/'));
  };

  const moveJS = () => {
    return app.gulp
      .src('src/styles/js/pages/#BUILD/*.js')
      .pipe(app.gulp.dest('src/styles/js/pages/'));
  };

  // Задача для очистки папок #BUILD
  const cleanBuildFolders = () => {
    return plugins.del([
      'src/html/views/#BUILD',
      'src/styles/scss/pages/#BUILD',
      'src/styles/js/pages/#BUILD',
    ]);
  };

  // Выполняем задачи последовательно и вызываем done после их завершения
  return app.gulp.series(
    moveHTML,
    moveSCSS,
    moveJS,
    cleanBuildFolders,
    (seriesDone) => {
      seriesDone();
      done();
    }
  )();
};
