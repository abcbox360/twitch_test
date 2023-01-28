
import gulp from'gulp'
import inline from'gulp-inline'
import stylus from'gulp-stylus'
import minifyCSS from'gulp-minify-css'
import rename from'gulp-rename'
import webpack from'gulp-webpack'
import uglify from'gulp-uglify'
import imagemin from'gulp-imagemin'

function Imagemin () {
  return gulp.src('./src/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/src/img'))
}

function CSS () {
  return gulp.src('./src/css/*.styl')
    .pipe(stylus())
    .pipe(gulp.dest('dist/src/css'))
    .pipe(minifyCSS())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('dist/src/css'))
}

function Webpack () {
  return gulp.src('./src/js/index.js')
    .pipe(webpack())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('dist/src/js'))
    .pipe(uglify())
    .pipe(rename('bundle.min.js'))
    .pipe(gulp.dest('dist/src/js'))
}

function Inline () {
  return gulp.src('index.html')
    .pipe(inline({
      base: './'
    }))
    .pipe(gulp.dest('dist/'))
}

export default  gulp.series(Imagemin, Webpack, CSS, Inline)

export let I = Imagemin
