/*eslint no-undef: "off"*/
import { plugins } from '../../config/plugins.js';

export function linter() {
  return app.gulp
    .src(['src/**/*.js'])
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
    .pipe(plugins.eslint.failAfterError());
}
