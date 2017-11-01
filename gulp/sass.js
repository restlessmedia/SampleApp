var watch = require('gulp-watch');
var sass = require('gulp-sass');

module.exports = function (gulp, src, dest, options) {
    options = options || {};

    var task = function () {
        return gulp.src(src)
            .pipe(sass({ outputStyle: 'compressed' })
                .on('error', sass.logError))
            .pipe(gulp.dest(dest));
    }

    if (options.watch) {
        watch([options.watch], task)
            .on('change', function () {
                console.log('Compiling sass');
            })
    }

    return task;
}