/*eslint no-undef: "off"*/
import { plugins } from '../../config/plugins.js';

export const images = () => {
  return (
    app.gulp
      .src(app.path.src.images)
      .pipe(
        plugins.plumber(
          plugins.notify.onError({
            title: 'IMAGES',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      .pipe(plugins.newer(app.path.build.images))
      // .pipe(app.plugins.if(app.isBuildMax, webp())) // TODO: тесты
      // .pipe(app.plugins.if(app.isBuildMax, app.gulp.dest(app.path.build.images))) // TODO: тесты
      .pipe(app.gulp.src(app.path.src.images))
      .pipe(
        plugins.if(
          app.isBuild,
          plugins.imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 4, // 0 to 7
          })
        )
      )
      .pipe(app.gulp.dest(app.path.build.images))
      .pipe(app.gulp.src(app.path.src.svg))
      .pipe(app.gulp.dest(app.path.build.images))
      .pipe(plugins.browserSync.stream())
  );
};
