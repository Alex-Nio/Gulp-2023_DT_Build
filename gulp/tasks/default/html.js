/*eslint no-undef: "off"*/
import { plugins } from '../../config/plugins.js';

const __dirname = plugins.path.resolve();

export const html = () => {
  const folderPattern = 'src/html/views/!(*#BUILD)/';

  const pageFolders = plugins.glob.sync(folderPattern);

  const mainFiles = pageFolders.map((folder) => {
    const folderName = plugins.path.basename(folder);

    return `${folder}/${folderName}.html`;
  });

  return (
    app.gulp
      .src([app.path.src.html, ...mainFiles])
      .pipe(
        plugins.plumber(
          plugins.notify.onError({
            title: 'HTML',
            message: 'Ошибка: <%= error.message %>',
          })
        )
      )
      .pipe(
        plugins.fileinclude({
          prefix: '@@',
          basepath: plugins.path.join(__dirname, 'src/html'),
        })
      )
      .pipe(
        plugins.htmlMin({
          useShortDoctype: true,
          sortClassName: true,
          // collapseWhitespace: plugins.app.isBuildMax || plugins.app.isBuildMin, // TODO: Тесты
          // removeComments: plugins.app.isBuildMax || plugins.app.isBuildMin, // TODO: Тесты
        })
      )
      .pipe(plugins.replace(/@img\//g, 'images/'))
      // .pipe(plugins.if(app.isBuildMax, webpHtmlNosvg())) // TODO: Тесты
      .pipe(
        plugins.versionNumber({
          value: '%DT%',
          append: {
            key: '_v',
            cover: 0,
            to: ['css', 'js'],
          },
          output: {
            file: 'gulp/version.json',
          },
        })
      )
      .pipe(
        plugins.htmlbeautify({
          indent_size: 2,
          indent_char: ' ',
          eol: '\n',
          indent_level: 0,
          indent_with_tabs: false,
          preserve_newlines: true,
          max_preserve_newlines: 10,
          jslint_happy: false,
          space_after_anon_function: false,
          brace_style: 'collapse',
          keep_array_indentation: false,
          keep_function_indentation: false,
          space_before_conditional: true,
          break_chained_methods: false,
          eval_code: false,
          unescape_strings: false,
          wrap_line_length: 120,
          wrap_attributes: 'auto',
          wrap_attributes_indent_size: 2,
          end_with_newline: false,
        })
      )
      .pipe(plugins.replace(/^\s*\n/gm, ''))
      .pipe(app.gulp.dest(app.path.build.html))
      .pipe(plugins.browserSync.stream())
  );
};
