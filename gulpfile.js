const gulp = require('gulp'),
  concat = require('gulp-concat'),
  //less = require('gulp-less'),
  uglify = require('gulp-uglify'),
  //imagemin = require('gulp-imagemin'),
  sourcemaps = require('gulp-sourcemaps'),
  ignore = require('gulp-ignore'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish'),
  del = require('del'),
  qunit = require('gulp-qunit'),
  gutil = require('gulp-util'),
  exec = require('gulp-exec'),
  fs = require("fs"),
  paths = {
     basescript: [
       'src/wrappers/wrapper-start.js'
      , 'src/init.js' 
      , 'src/selector.js'
      , 'src/iterators.js'
      , 'src/dom.js'
      , 'src/events.js'
      , 'src/private.js'
      , 'src/style.js'
      , 'src/wrappers/wrapper-end.js'
    ]
    , testingScripts: ['tests/scripts/*.js' ]
    , tests: ['./tests/index.html']
  };

///Tasks
//Build Script
gulp.task('buildTestScript', [], () => {
  del(['build/ant.js']);
  return gulp.src(paths.basescript)
    .pipe(concat('ant.js'))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('build'));
});
//Test Script
gulp.task('unittest', ['buildTestScript'], () => {
  return gulp.src(paths.tests).pipe(qunit());
});
//Minify Script
gulp.task('buildScript', ['unittest'], () => {
  del(['build/ant.min.js']);
  del(['build/ant.min.js.map']);
  return gulp.src(['build/ant.js'])
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(uglify().on('error', gutil.log))
    .pipe(concat('ant.min.js'))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('build'));
});
//Watch File Changes and Run Tasks
gulp.task('watch', ['buildScript'], function () {
  gulp.watch(paths.basescript.concat(paths.testingScripts), ['buildScript']);
});
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);
gulp.task("build", ['buildScript'])
gulp.task("test", ['unittest'], () => {  })