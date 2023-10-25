import notify from 'gulp-notify'; // Сообщения (подсказки)
import ttf2woff from 'gulp-ttf2woff';
import vinylFTP from 'vinyl-ftp';
import imagemin from 'gulp-imagemin';
import del from 'del';
import * as dartSass from 'sass';
import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import htmlbeautify from 'gulp-html-beautify';
import inquirer from 'inquirer';
import replace from 'gulp-replace'; // Поиск и замена
import plumber from 'gulp-plumber'; // Обработка ошибок
import browserSync from 'browser-sync'; // Локальный сервер
import newer from 'gulp-newer'; // Проверка обновления
import ifPlugin from 'gulp-if'; // Условное ветвление
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import file from 'gulp-file';
import * as glob from 'glob';
import filter from 'gulp-filter';
import ttf2woff2 from 'gulp-ttf2woff2';
import mergeStream from 'merge-stream';
import util from 'gulp-util';
import fileinclude from 'gulp-file-include';
import webpHtmlNosvg from 'gulp-webp-html-nosvg';
import versionNumber from 'gulp-version-number';
import htmlMin from 'gulp-htmlmin';
import webp from 'gulp-webp';
import webpack from 'webpack-stream';
import eslint from 'gulp-eslint';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import webpcss from 'gulp-webpcss'; // Вывод WEBP изображений
import autoPrefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа запросов
import svgSprite from 'gulp-svg-sprite';
import zipPlugin from 'gulp-zip';
import * as fspromise from 'fs/promises';

export const plugins = {
  inquirer: inquirer,
  htmlbeautify: htmlbeautify,
  zipPlugin: zipPlugin,
  dartSass: dartSass,
  gulpSass: gulpSass,
  svgSprite: svgSprite,
  rename: rename,
  cleanCss: cleanCss,
  webpcss: webpcss,
  autoPrefixer: autoPrefixer,
  groupCssMediaQueries: groupCssMediaQueries,
  del: del,
  eslint: eslint,
  webpack: webpack,
  webp: webp,
  imagemin: imagemin,
  vinylFTP: vinylFTP,
  fileinclude: fileinclude,
  webpHtmlNosvg: webpHtmlNosvg,
  versionNumber: versionNumber,
  htmlMin: htmlMin,
  util: util,
  ttf2woff: ttf2woff,
  ttf2woff2: ttf2woff2,
  mergeStream: mergeStream,
  glob: glob,
  replace: replace,
  filter: filter,
  plumber: plumber,
  file: file,
  notify: notify,
  browserSync: browserSync,
  fs: fs,
  fspromise: fspromise,
  path: path,
  chalk: chalk,
  newer: newer,
  if: ifPlugin,
};
