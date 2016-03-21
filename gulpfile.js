var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var webpack = require('webpack-stream');
var pkg = require('./package');

var Server = require('karma').Server;

gulp.task('test', function (cb) {
  new Server({
    configFile: path.join(__dirname, 'karma.conf.js'),
    singleRun: true,
  }, function (code) {
    if (code) {
      cb(new Error('test failure'));
    } else {
      cb();
    }
  }).start();
});

gulp.task('static', function () {
  return gulp.src('**/*.js')
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('webpack', function () {
  return gulp.src(path.resolve(pkg.main))
    .pipe(webpack(require('./webpack.config')))
    .pipe(gulp.dest('dist/'));
});

gulp.task('prepublish', ['webpack']);

gulp.task('default', ['static', 'webpack']);
