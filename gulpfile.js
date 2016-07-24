/**
 * Created by ZZS on 7/22/16.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create(); //auto browser reload
var useref = require('gulp-useref'); //concat js or css file
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano'); //minify css
var imagemin = require('gulp-imagemin'); //compress img
var cache = require('gulp-cache'); //use cache so don't need to minify other img everytime
var del = require('del'); //used to delete files
var runSequence = require('run-sequence'); //make run task one by one
var htmlmin = require('gulp-htmlmin');

gulp.task('build', function (callback) {
    //inside [] will run simultaneously, or run one by one
    runSequence('clean:dist', ['sassToCss', 'useref', 'imgmin', 'moveAppjs'], 'htmlmin', callback);
});

// automatically change scss and reload
gulp.task('watch', ['browserSync', 'sassToCss'], function () {
    gulp.watch('public/assets/scss/**/*.+(sass|scss)', ['sassToCss']);
    gulp.watch('public/**/*.html', browserSync.reload);
    gulp.watch('public/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'public'
        }
    })
});

gulp.task('sassToCss', function () {
    return gulp.src('public/assets/scss/**/*.+(sass|scss)') //any sass or scss file under /scss and children
        .pipe(sass())
        .pipe(gulp.dest('public/assets/css')) //output to only dir
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('useref', function () {
    return gulp.src('public/**/*.html')
        .pipe(useref())     //concat all js or css files
        .pipe(gulpIf('*.js', uglify())) //minify if is a js file
        .pipe(gulpIf('*.css', cssnano())) //minify css
        .pipe(gulp.dest('dist'))
});

gulp.task('htmlmin', function () {
    return gulp.src('dist/**/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            caseSensitive: true
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('imgmin', function(){
    return gulp.src('public/assets/img/*.+(png|jpg|gif|svg)')
        .pipe(cache(imagemin({  //minify img really slow, so use cache
            interlaced: true //this will make gif interlaced load (blur->clear), looks faster
        })))
        .pipe(gulp.dest('dist/assets/img'))
});

gulp.task('moveAppjs', function(){
    return gulp.src('public/app.js')
        .pipe(gulpIf('*.js', uglify())) //minify if is a js file
        .pipe(gulp.dest('dist/'))
});


gulp.task('clean:dist', function () {
    return del.sync('dist');
});

gulp.task('cache:clear', function (callback) {
    return cache.clearAll(callback);
});