import fileinclude from "gulp-file-include";
import webpHtmlNosvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import htmlMin from "gulp-htmlmin";
import path from "path";

const __dirname = path.resolve();

export const html = () => {
  return app.gulp
    .src([app.path.src.html, "src/html/views/**/*.html"])
    .pipe(
      app.plugins.plumber(
        app.plugins.notify.onError({
          title: "HTML",
          message: "Error: <%= error.message %>"
        })
      )
    )
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: path.join(__dirname, "src/html")
      })
    )
    .pipe(
      htmlMin({
        useShortDoctype: true,
        sortClassName: true,
        collapseWhitespace: app.isBuild,
        removeComments: app.isBuild
      })
    )
    .pipe(app.plugins.replace(/@img\//g, "images/"))
    .pipe(app.plugins.if(app.isBuild, webpHtmlNosvg()))
    .pipe(
      app.plugins.if(
        app.isBuild,
        versionNumber({
          value: "%DT%",
          append: {
            key: "_v",
            cover: 0,
            to: ["css", "js"]
          },
          output: {
            file: "gulp/version.json"
          }
        })
      )
    )
    .pipe(app.gulp.dest(app.path.build.html))
    .pipe(app.plugins.browserSync.stream());
};
