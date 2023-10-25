/*eslint no-undef: "off"*/
import { plugins } from '../../config/plugins.js';

export const zip = () => {
  del(`./${app.path.rootFolder}.zip`);

  return app.gulp
    .src(`${app.path.buildFolder}/**/*.*`, {})
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: 'ZIP',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(plugins.zipPlugin(`${app.path.rootFolder}.zip`))
    .pipe(app.gulp.dest('./'));
};
