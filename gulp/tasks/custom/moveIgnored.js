/*eslint no-undef: "off"*/
import { plugins } from '../../config/plugins.js';

export const moveAndCleanIgnored = (done) => {
  // Переместим папки из IGNORE в родительские папки
  const moveIgnored = () => {
    return app.gulp
      .src('src/html/views/IGNORE/**')
      .pipe(app.gulp.dest('src/html/views/'))
      .pipe(app.gulp.src('src/styles/scss/pages/IGNORE/**'))
      .pipe(app.gulp.dest('src/styles/scss/pages/'))
      .pipe(app.gulp.src('src/styles/js/pages/IGNORE/*.js'))
      .pipe(app.gulp.dest('src/styles/js/pages/'));
  };

  // Задача для очистки папок IGNORED
  const cleanIgnored = () => {
    return plugins.del([
      'src/html/views/IGNORE/**',
      'src/styles/scss/pages/IGNORE/**',
      'src/styles/js/pages/IGNORE/**',
    ]);
  };

  // Выполняем задачи последовательно и вызываем done после их завершения
  return app.gulp.series(moveIgnored, cleanIgnored, (seriesDone) => {
    seriesDone();
    done();
  })();
};
