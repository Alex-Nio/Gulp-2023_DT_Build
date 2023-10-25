/*eslint no-undef: "off"*/
import { plugins } from '../../config/plugins.js';

export const svgSprive = () => {
  return app.gulp
    .src(`${app.path.src.svgicons}`, {})
    .pipe(
      plugins.plumber(
        plugins.notify.onError({
          title: 'SVG',
          message: 'Error: <%= error.message %>',
        })
      )
    )
    .pipe(
      plugins.svgSprite({
        mode: {
          stack: {
            sprite: '../icons/icons.svg',
            // Создавать страницу с перечнем иконок
            example: true,
          },
        },
      })
    )
    .pipe(app.gulp.dest(`${app.path.build.images}`));
};
