var path = require('path');
var gulp = require('gulp');
var webpack = require('webpack-stream');
var pkg = require('./package');

gulp.task('webpack', function () {
  return gulp.src(path.resolve(pkg.main))
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('prepublish', ['webpack']);
