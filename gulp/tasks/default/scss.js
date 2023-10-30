/*eslint no-undef: "off"*/
import { plugins } from '../../config/plugins.js';

const sass = plugins.gulpSass(plugins.dartSass);

export const scss = () => {
  const pageFolders = plugins.glob.sync('src/styles/scss/pages/!(*#BUILD)/');

  const mainFiles = pageFolders.map((folder) => {
    const folderName = plugins.path.basename(folder);
    return `${folder}/${folderName}.scss`;
  });

  return (
    app.gulp
      .src(mainFiles, { sourcemaps: app.isDev })
      .pipe(
        plugins.plumber(
          plugins.notify.onError({
            title: 'SCSS',
            message: 'Error: <%= error.message %>',
          })
        )
      )
      .pipe(plugins.replace(/@img\//g, '../images/'))
      .pipe(sass({ outputStyle: 'expanded' }))
      .pipe(plugins.groupCssMediaQueries())
      .pipe(
        plugins.autoPrefixer({
          grid: false,
          overrideBrowserslist: ['last 10 versions'],
          cascade: true,
        })
      )
      // Расскомментировать если нужен обычный дубль файла стилей
      // .pipe(app.gulp.dest(app.path.build.css))
      .pipe(plugins.cleanCss())
      .pipe(
        plugins.rename((file) => {
          file.dirname = ''; // Удаляем имя папки
          file.extname = '.min.css'; // Меняем расширение файла
        })
      )
      .pipe(app.gulp.dest(app.path.build.css))
      .pipe(plugins.browserSync.stream())
  );
};
