/* eslint-disable */
export const copyData = () => {
  return app.gulp
    .src(app.path.src.data)
    .pipe(app.gulp.dest(app.path.build.data));
};

// export const copyFiles = () => {
//   return app.gulp
//     .src(app.path.src.files)
//     .pipe(app.gulp.dest(app.path.build.files));
// };
