var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    del = require('del'),
    ngannotate = require('gulp-ng-annotate');

gulp.task('jshint', function() {
  return gulp.src('app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('usemin', ['jshint'], function() {
  return gulp.src('app/**/*.html')
    .pipe(usemin({
      css: [ minifycss(), rev() ],
      js: [ ngannotate(), uglify(), rev() ]
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copyfonts', ['clean'], function() {
   gulp.src('./bower_components/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
   gulp.src('./bower_components/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imagemin', function() {
  return del(['dist/images']), gulp.src('app/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Image compression complete.' }));
});

gulp.task('browser-sync', function () {
   var files = [
      'app/**/*.html',
      'app/styles/**/*.css',
      'app/images/**/*.png',
      'app/scripts/**/*.js',
      'bower_components/**',
   ];

   browserSync.init(files, {
      server: {
         baseDir: 'app',
         index: 'views/index.html',
         routes: {
           '/bower_components': 'bower_components'
         }
      }
   });
   gulp.watch(['app/**']).on('change', browserSync.reload);
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('{ app/scripts/**/*.js,app/styles/**/*.css,app/**/*.html }', ['usemin']);
  gulp.watch('app/images/**/*', ['imagemin']);
});

gulp.task('default', ['clean'], function() {
  gulp.start('usemin', 'imagemin', 'copyfonts');
});
