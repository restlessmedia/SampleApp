const gulp = require('gulp');
const browserify = require('browserify');
const watchify = require('watchify');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const buffer = require('vinyl-buffer');
const gulpif = require('gulp-if');
const uglifyify = require('uglifyify');
const envify = require('envify');

module.exports = (src, dest, destSrc = 'app.js') => {
    var minify = process.env.NODE_ENV == 'production';

    return () => {
        const bundler = browserify(src, {
            extensions: ['.jsx'],
            plugin: [watchify]
        })

        if (minify) {
            bundler
                .transform({
                    NODE_ENV: process.env.NODE_ENV,
                    global: true
                }, 'envify')
                .transform({
                    global: true
                }, 'uglifyify')
        }

        bundler.on('update', () => {
            console.log('bundling...');
            bundle();
        });

        function bundle() {
            bundler.bundle()
                .on('error', (e) => { console.log(e) })
                .pipe(source(destSrc))
                .pipe(buffer())
                //.pipe(gulpif(minify, uglify({ global: true })))
                .pipe(gulp.dest(dest));
        }

        return bundle();
    }
};