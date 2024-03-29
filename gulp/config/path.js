// Получаем имя папки проекта
import * as nodePath from 'path';
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = './dist';
const srcFolder = './src';

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    pages: `${buildFolder}/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`,
    data: `${buildFolder}/`,
  },
  src: {
    images: `${srcFolder}/assets/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/assets/images/**/*.svg`,
    svgicons: `${srcFolder}/assets/images/svg/*.svg`,
    html: `${srcFolder}/*.html`,
    pages: `${srcFolder}/html/views/*.html`,
    js: `${srcFolder}/styles/js/**/*.js`,
    componentsJs: `${srcFolder}/html/components/**/*.js`,
    componentsJson: `${srcFolder}/html/components/**/*.json`,
    scss: `${srcFolder}/styles/scss/pages/**/*.scss`,
    componentsScss: `${srcFolder}/html/components/**/*.scss`,
    files: `${srcFolder}/files/**/*.*`,
    data: `${srcFolder}/styles/js/data/*.json`,
  },
  watch: {
    js: `${srcFolder}/styles/js/**/*.js`,
    componentsJs: `${srcFolder}/html/components/**/*.js`,
    componentsJson: `${srcFolder}/html/components/**/*.json`,
    scss: `${srcFolder}/styles/scss/**/*.scss`,
    componentsScss: `${srcFolder}/html/components/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    pages: `${srcFolder}/html/views/*.html`,
    images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    files: `${srcFolder}/files/**/*.*`,
    data: `${srcFolder}/styles/js/data/*.json`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: 'test',
};
