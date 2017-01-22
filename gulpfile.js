const gulp = require('gulp');
const gulpTypeScript = require('gulp-typescript');

const tsProject = gulpTypeScript.createProject('tsconfig.json');

gulp.task('scripts', () => {
  const tsResult = tsProject.src()
      .pipe(tsProject());
  return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
  gulp.watch('**/*.ts', ['scripts']);
});

gulp.task('default', ['watch']);
