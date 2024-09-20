const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// Paths
const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css'
    },
    html: {
        src: 'src/*.html',
        dest: 'dist/'
    },
    js: {
        src: 'src/js/*.js',
        dest: 'dist/js'
    },
    images: {
        src: 'images/**/*',
        dest: 'dist/images'
    }
};

// Compile SCSS into CSS
function style() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

// Copy HTML files
function copyHtml() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browserSync.stream());
}

// Copy JavaScript files
function copyJs() {
    return gulp.src(paths.js.src)
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream());
}

// Copy Images
function copyImages() {
    return gulp.src(paths.images.src)
        .pipe(gulp.dest(paths.images.dest))
        .pipe(browserSync.stream());
}

// Watch files and reload browser on changes
function watch() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    gulp.watch(paths.styles.src, style);
    gulp.watch(paths.html.src, copyHtml);
    gulp.watch(paths.js.src, copyJs);
    gulp.watch(paths.images.src, copyImages);
    gulp.watch(paths.html.src).on('change', browserSync.reload);
}

// Export tasks
exports.style = style;
exports.watch = watch;
exports.copyHtml = copyHtml;
exports.copyJs = copyJs;
exports.copyImages = copyImages;

exports.default = gulp.series(copyHtml, copyImages, copyJs, style, watch);
