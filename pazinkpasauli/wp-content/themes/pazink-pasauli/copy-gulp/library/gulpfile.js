'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const sourcemaps = require('gulp-sourcemaps');
const glob = require('glob');
const fs = require('fs');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const jscs = require('gulp-jscs');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const jshint = require('gulp-jshint');
const gutil = require('gulp-util');
const rename = require("gulp-rename");
const pump = require("pump");
const connect = require('gulp-connect-php');
const cssnano = require('gulp-cssnano');
const browserSync = require('browser-sync').create();
const babel = require("gulp-babel");

const baseDir = '';

const config = {
  source: {
    js: {
      src: baseDir + 'js/src/**/*.js',
      concatenated: baseDir + 'js/main.js',
      components: baseDir + 'js/components/*.js',
      concatenatedMain: baseDir + 'js/main.js',
      concatenatedComp: baseDir + 'js/components.js'
    },
    scss: baseDir + 'css/scss/src/**/*.scss',
    css: [baseDir + 'css/styles.css']
  },
  dest: {
    js: baseDir + 'js',
    css: baseDir + 'css',
    scss: baseDir + 'css/scss'
  }
};
const jsdoc = require('gulp-jsdoc3');

// Sass Compilation

gulp.task('sass-compile', function() {
  return gulp.src(['css/scss/styles.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest.css));
});

gulp.task('sass-lint', function() {
  return gulp.src(config.source.scss)
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('build-js', function() {
  pump([
    gulp.src(config.source.js.src),
    sourcemaps.init(),
    babel(),
    concat('main.js'),
    sourcemaps.write(),
    gulp.dest(config.dest.js)
  ]);
});

gulp.task('build-component-js', function() {
  return gulp.src(config.source.js.components)
    .pipe(sourcemaps.init())
    .pipe(concat('components.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest.js))
});

gulp.task('jscs', function() {
  return gulp.src(config.source.js.src)
    .pipe(jscs())
    .pipe(jscs.reporter());
});

gulp.task('autoprefixer', ['sass-compile'], function() {

  return gulp.src(config.source.css)
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer({
      browsers: ['last 3 versions']
    })]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(config.dest.css));
});

gulp.task('jshint', function() {
  return gulp.src([config.source.js.src])
    .pipe(jshint())
    .pipe(jshint.reporter('unix'));
});

var globAllSassFiles = function() {
  var options = {};

  glob(config.source.scss, options, function(er, files) {
    var importString = '//Do not add to this file as it is automatically generated\n\n';

    for (var i = 0; i < files.length; i++) {
      var obj = files[i];
      obj = obj.replace('css/scss/', '');
      obj = obj.replace('/_', '/');
      obj = obj.replace('.scss', '');
      importString += '@import \'' + obj + '\';\n';
    }
    fs.writeFileSync(config.dest.scss + '/styles.scss', importString, 'utf8');
  });
};

gulp.task('sass-glob', function() {
  globAllSassFiles();
});

gulp.task('js-doc', function (cb) {
  gulp.src(config.source.js.src, {read: false})
    .pipe(jsdoc(cb));
});

gulp.task('prod', ['autoprefixer', 'build-component-js', 'build-js'], function() {
  gulp.src(config.source.css)
    .pipe(rename({suffix: '.min'}))
    .pipe(sourcemaps.init())
    .pipe(cssnano())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest.css));

  gulp.src(config.source.js.concatenatedMain)
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(config.dest.js));

  gulp.src(config.source.js.concatenatedComp)
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(config.dest.js));
});

// Watch tasks
gulp.task('default', ['sass-glob', 'autoprefixer', 'build-component-js', 'build-js'], function() {
  globAllSassFiles();

  var sassWatcher = gulp.watch(config.source.scss, ['sass-lint', 'autoprefixer']);
  sassWatcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type);
    // If a file has been added, regenerate the styles.scss file
    if (event.type === 'added' || event.type === 'deleted') {
      globAllSassFiles();
    }
  });
  var jsWatcher = gulp.watch(config.source.js.src, ['build-js', 'jshint', 'jscs', 'js-doc']);
  var componentJsWatcher = gulp.watch(config.source.js.components, ['build-component-js']);
  browserSync.init({
    server: {
      baseDir: "../"
    },
    files: config.source.css
  });
});

gulp.task('copy', function() {
  var sourceFiles = ['images/**', 'index.htm', 'js/*.js', 'css/normalize.css', 'css/styles.css'];
  var destination = 'dest/';

  return gulp
    .src(sourceFiles, {base: '.'})
    .pipe(gulp.dest(destination));
});
