var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var csso = require('gulp-csso');
var cssImport = require('gulp-cssimport');





gulp.task('scss', function () {
	return gulp.src('dev/scss/**/*.scss')
		.pipe(plumber({
			errorHandler: notify.onError()
		}))
        .pipe(sass())
        .pipe(cssImport())
		.pipe(autoprefixer({
			browsers: ['last 10 versions']
		}))
		.pipe(csso())
		.pipe(gulp.dest('dist/css/'));
});


gulp.task('image-o', function () {
	gulp.src('static/*.*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img/'));
});
gulp.task('dev', function () {
	browserSync.init(['./dist/css/*.css', '[name].html', './dist/js/*.js'], {
		server: {
			baseDir: './'
		}
	});

	gulp.watch(['dev/scss/**/*.scss'], ['scss']);
	gulp.watch(['static/*.*'], ['image-o']);
});


gulp.task('default', ['scss', 'dev', 'image-o']);