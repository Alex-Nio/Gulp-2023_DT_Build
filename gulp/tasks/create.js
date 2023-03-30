import gulp from "gulp";
import file from "gulp-file";

export const createComponent = () => {
  const componentName = process.argv[4] || "";

  if (!componentName) {
    console.error("Component name is not provided!");
    return;
  }

  // Создать файл my-component.html
  file(`${componentName}.html`, "", { src: true }).pipe(gulp.dest(`src/html/components/${componentName}`));

  // Создать файл my-component.scss
  file(`${componentName}.scss`, "", { src: true }).pipe(gulp.dest(`src/html/components/${componentName}`));

  // Создать файл my-component.js
  file(`${componentName}.js`, "", { src: true }).pipe(gulp.dest(`src/html/components/${componentName}`));

  return Promise.resolve();
};
