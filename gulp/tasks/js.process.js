'use strict';

let uglify = require('gulp-uglify-es').default;
let babel = require('gulp-babel');

module.exports = () => {
	$.gulp.task('js:process', () => {
		return $.gulp.src('./source/js/app.js')
			.pipe(babel({
					presets: ['env']
			}))
			.pipe(uglify())
			.pipe($.gulp.dest($.config.root + '/assets/js')),
			$.gulp.src('./source/js/app-pyatka.js')
				.pipe(babel({
					presets: ['env']
				}))
				.pipe(uglify())
				.pipe($.gulp.dest($.config.root + '/assets/js'));
	})
};