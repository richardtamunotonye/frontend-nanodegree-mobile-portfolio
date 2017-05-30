#!/usr/bin/env node

'use strict';
var gulp = require('gulp');
var cache    = require('gulp-cache');
var plumber  = require('gulp-plumber');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var uglify  = require('gulp-uglify');
var cssmin = require('gulp-cssmin');


gulp.task('watch', function() {
  gulp.watch('app/*.html', ['html']);
  gulp.watch('app/css/*.css', ['css']);
  gulp.watch('app/js/*.js', ['js']);
  gulp.watch('app/img/*', ['imagemin']);
});

gulp.task('imagemin', function() {
  return gulp.src('app/img/*')
    .pipe(plumber())
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('html', function() {
  return gulp.src('app/*.html')
    .pipe(plumber())
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
      minifyURLs: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  return gulp.src('app/js/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('css', function () {
    gulp.src('app/css/*.css')
        .pipe(plumber())
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});
