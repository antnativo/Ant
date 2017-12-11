const server = require('./tests/server'),
  gulp = require('gulp'),
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
      , 'src/animation.js'
      , 'src/wrappers/wrapper-end.js'
    ]
    , testingScripts: ['tests/scripts/*.js' ]
    , tests: ['./tests/index.html']
  };

///Tasks
//Build Script
gulp.task('startServer', [], () => {
  server.start((err) => { if (err) { throw err; } console.log(`Server running at: ${server.info.uri}`); });
})
gulp.task('stopServer', [], () => {
  server.stop();
})
gulp.task('moveTestJS', ['buildTestScript'], () => {
  return gulp.src(['./build/*'])
    .pipe(exec('ditto build/* tests/build/'), true);
});
gulp.task('buildTestScript', [], () => {
  del(['build/ant.js']);
  return gulp.src(paths.basescript)
    .pipe(concat('ant.js'))
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('build'));
});
//Test Script
gulp.task('unittest', ['moveTestJS'], () => {
  return gulp.src(paths.tests).pipe(qunit());  
});
gulp.task('buildUnitTest', ['moveTestJS'], () => { 
  var unitTest = qunit();
  unitTest._transformState.writecb = function () { console.log("Begining Test Results Output")}
  unitTest._transformState.afterTransform()
  unitTest._events.error = function () { console.log("ERROR: ", arguments); process.exit(1) }
  unitTest._events.end = function () { }
  unitTest._events.finish = function () { process.exit(0); }
  return gulp.src(paths.tests).pipe(unitTest);
})
//Minify Script
gulp.task('buildScript', [], () => {
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
  //gulp.watch(paths.basescript.concat(paths.testingScripts), ['buildScript']);
  gulp.watch(paths.basescript.concat(paths.testingScripts), ['unittest']);
});
// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch']);
gulp.task("build", ['buildUnitTest','buildScript'])
gulp.task("test", ['startServer', 'unittest'], () => { server.stop(); })
gulp.task("startserver", [], () => { server.start(); })
gulp.task("stopserver", [], () => { server.stop(); })