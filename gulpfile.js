const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const del = require('del');
const spritesmith = require('gulp.spritesmith');
const svgSprite = require('gulp-svg-sprites');
const concat = require('gulp-concat');
const minify = require('gulp-minify');
const cssmin = require('gulp-cssmin');

function styles(cb) {
	return src('src/sass/style.scss')
		.pipe(sass({ outputStyle: 'compact' }).on('error', sass.logError))
		.pipe(dest('src/css'));

	cb();
}
exports.styles = styles;

// function styles(cb) {
// 	return src('src/sass/style-new.scss')
// 		.pipe(sass({ outputStyle: 'compact' }).on('error', sass.logError))
// 		.pipe(dest('src/css'));

// 	cb();
// }
// exports.styles = styles;

function svg(cb) {
	return src('src/images/svg/*.svg')
		.pipe(
			svgSprite({
				mode: 'symbols',
				svg: {
					svgPath: '../svg/svg/%f'
				}
			})
		)
		.pipe(dest('src/svg'));

	cb();
}
exports.svg = svg;

function sprite(cb) {
	return src('src/images/icons/*.png')
		.pipe(
			spritesmith({
				imgName: 'sprite.png',
				cssName: 'sprite.scss',
				padding: 10,
				algorithm: 'top-down',
				imgPath: '../images/sprite/sprite.png'
			})
		)
		.pipe(dest('src/images/sprite/'));

	cb();
}
exports.sprite = sprite;

function concatStyles(cb) {
	return src('src/css/libs/*.css')
		.pipe(concat('libs.minify.css'))
		.pipe(cssmin())
		.pipe(dest('src/css/'));

	cb();
}
exports.concatStyles = concatStyles;

function concatJS(cb) {
	return src('src/js/libs/*.js')
		.pipe(concat('libs.concat.js'))
		.pipe(
			minify({
				ext: {
					min: '.min.js'
				}
			})
		)
		.pipe(dest('src/js/'));

	cb();
}
exports.concatJS = concatJS;

exports.default = function() {
	watch('src/sass/**/*.scss', series(sprite, styles));
	watch('src/images/icons/*.png', sprite);
	watch('src/images/svg/*.svg', svg);
};

// gulp.task('build', ['clean', 'img', 'sass'], function() {

//     var buildCss = gulp.src('src/css/**/*.css')
//     .pipe(gulp.dest('dist/css'))

//     var buildFonts = gulp.src('src/fonts/**/*') // Переносим шрифты в продакшен
//     .pipe(gulp.dest('dist/fonts'))

//     var buildJs = gulp.src('src/js/**/*') // Переносим скрипты в продакшен
//     .pipe(gulp.dest('dist/js'))

//     var buildImgs = gulp.src(['!src/images/examples/**/*','src/images/**/*']) // Переносим картинки в продакшен
//     .pipe(gulp.dest('dist/images'))

//     var buildHtml = gulp.src('src/*.html') // Переносим HTML в продакшен
//     .pipe(gulp.dest('dist'));

//     var buildOther = gulp.src('src/.htaccess') // Переносим htaccess в продакшен
//     .pipe(gulp.dest('dist'));
// });
