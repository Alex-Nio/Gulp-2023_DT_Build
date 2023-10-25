/*eslint no-undef: "off"*/
import { webpackConfig } from '../../../webpack.config.js';
import { plugins } from '../../config/plugins.js';

export const js = () =>
  app.gulp
    .src(app.path.src.js, { sourcemaps: app.isDev })
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: 'JS',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(plugins.webpack({ config: webpackConfig(app.isDev) }))
    .pipe(app.gulp.dest(app.path.build.js))
    .pipe(plugins.browserSync.stream());
