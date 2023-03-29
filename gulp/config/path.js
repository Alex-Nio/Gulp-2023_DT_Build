// Получаем имя папки проекта
import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  build: {
    js: `${buildFolder}/js/`,
    css: `${buildFolder}/css/`,
    html: `${buildFolder}/`,
    images: `${buildFolder}/images/`,
    fonts: `${buildFolder}/fonts/`,
    files: `${buildFolder}/files/`
  },
  src: {
    js: `${srcFolder}/assets/js/app.js`,
    images: `${srcFolder}/assets/images/**/*.{jpg,jpeg,png,gif,webp}`,
    svg: `${srcFolder}/assets/images/**/*.svg`,
    scss: `${srcFolder}/assets/scss/main.scss`,
    html: `${srcFolder}/*.html`,
    files: `${srcFolder}/files/**/*.*`,
    svgicons: `${srcFolder}/assets/images/svg/*.svg`
  },
  watch: {
    js: `${srcFolder}/assets/js/**/*.js`,
    scss: `${srcFolder}/assets/scss/**/*.scss`,
    html: `${srcFolder}/**/*.html`,
    images: `${srcFolder}/**/*.{jpg,jpeg,png,svg,gif,webp,ico}`,
    files: `${srcFolder}/files/**/*.*`
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: `test`
};
