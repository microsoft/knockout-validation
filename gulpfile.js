var path = require('path');
var gulp = require('gulp');
var eslint = require('gulp-eslint');
var excludeGitignore = require('gulp-exclude-gitignore');
var webpack = require('webpack-stream');
var pkg = require('./package');

var spawn = require('child_process').spawn;

//
// Don't use Karma API for now
// For karma version 0.13.19 - 0.13.22, there's issue 1788
// -- Karma 0.13.19 taking long time to complete when run via gulp
// https://github.com/karma-runner/karma/issues/1788
// We should switch back to Karma API when the issue is fixed
//
// var Server = require('karma').Server;

gulp.task('test', function (cb) {
  var handler = function (code) {
    if (code) {
      cb(new Error('test failure'));
    } else {
      cb();
    }
  };

  // Don't use Karma API for now
  //
  // new Server({
  //   configFile: path.join(__dirname, 'karma.conf.js'),
  //   singleRun: true,
  // }, handler).start();
  //

  spawn(path.resolve('./node_modules/.bin/karma'), [
    'start',
    '--single-run',
  ], { stdio: 'inherit' }).on('close', handler);
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
