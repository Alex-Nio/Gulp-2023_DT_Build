/*eslint no-undef: "off"*/
import { plugins } from '../../config/plugins.js';

// 1. Конвертируем .ttf в .woff
const ttfToWoff = () => {
  const ttfFiles = app.gulp.src(`${app.path.srcFolder}/assets/fonts/*.ttf`, {});

  const woffStream = ttfFiles
    .pipe(plugins.ttf2woff())
    .pipe(app.gulp.dest(app.path.build.fonts));

  return plugins.mergeStream(woffStream);
};

// 2. Конвертируем .ttf в .woff2
const ttfToWoff2 = () => {
  const ttfFiles = app.gulp.src(`${app.path.srcFolder}/assets/fonts/*.ttf`, {});

  const woff2Stream = ttfFiles
    .pipe(plugins.ttf2woff2())
    .pipe(app.gulp.dest(app.path.build.fonts));

  return plugins.mergeStream(woff2Stream);
};

// 3. Переносим файлы icon шрифта
const iconFont = () => {
  const iconFontFiles = app.gulp
    .src(`${app.path.srcFolder}/assets/fonts/iconfont.{woff,eot,svg}`)
    .pipe(app.gulp.dest(`${app.path.build.fonts}`));

  return plugins.mergeStream(iconFontFiles);
};

const fonts = { ttfToWoff, ttfToWoff2, iconFont };

export { fonts };
