var gulp = require('gulp');
var concat = require('gulp-concat-sourcemap');
var uglify = require('gulp-uglifyjs');
var notify = require("gulp-notify");
var sass = require('gulp-sass');

var scripts = [
  './src/three.min.js', 
  './src/Projector.js',
  './src/CanvasRenderer.js',
  './src/sprint.js', 
  './src/smooth-scroll.js', 
  './src/main.js', 
];

gulp.task('concat', function() {
  gulp.src(scripts)
    .pipe(concat('main.js', {
      "sourceRoot": "/"
    }))
    .pipe(gulp.dest('./js/'))
    .pipe(notify('Trop cool. main.js combiné.'));
});

gulp.task('uglify', function() {
  gulp.src(scripts)
    .pipe(uglify('main.js', {
      outSourceMap: true,
      sourceRoot: '/'
    }))
    .pipe(gulp.dest('./js/'))
    .pipe(notify('Trop malade. main.js compressé.'));
});

gulp.task('sass', function () {
  gulp.src('./scss/*.scss')
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(gulp.dest('./css'))
    .pipe(notify('style.css compilé.'));
});

gulp.task('watch', function() {
  gulp.watch(scripts, ['concat']);
  gulp.watch('./scss/*.scss', ['sass']);
});
