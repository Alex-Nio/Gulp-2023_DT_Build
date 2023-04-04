import webp from "gulp-webp";
import imagemin from "gulp-imagemin";

export const images = () => {
  return app.gulp
    .src(app.path.src.images)
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "IMAGES",
          message: "Error: <%= error.message %>"
        })
      )
    )
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(app.plugins.if(app.isBuildMax, webp()))
    .pipe(app.plugins.if(app.isBuildMax, app.gulp.dest(app.path.build.images)))
    .pipe(app.plugins.if(app.isBuildMax || app.isBuildOptimized, app.gulp.src(app.path.src.images)))
    .pipe(app.plugins.if(app.isBuildOptimized, app.plugins.newer(app.path.build.images)))
    .pipe(
      app.plugins.if(
        app.isBuildOptimized,
        imagemin({
          progressive: true,
          svgoPlugins: [{ removeViewBox: false }],
          interlaced: true,
          optimizationLevel: 4 // 0 to 7
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browserSync.stream());
};
