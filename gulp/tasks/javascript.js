'use strict';

let uglify = require('gulp-uglify-es').default;
let babel = require('gulp-babel');

module.exports = () => {
	$.gulp.task('copy:javascripts', () => {
		return $.gulp.src('./source/js/app.js', { since: $.gulp.lastRun('copy:javascripts') })
			.pipe(babel({
				presets: ['env']
			}))
			.pipe(uglify())
			.pipe($.gulp.dest($.config.root + '/assets/js')),
			$.gulp.src('./source/js/app-pyatka.js', { since: $.gulp.lastRun('copy:javascripts') })
				.pipe(babel({
					presets: ['env']
				}))
				.pipe(uglify())
				.pipe($.gulp.dest($.config.root + '/assets/js'));
	});
};