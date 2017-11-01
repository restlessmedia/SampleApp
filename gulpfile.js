var gulp = require('gulp');
var sass = require('./gulp/sass');
var bundle = require('./gulp/bundle');

//process.env.NODE_ENV = 'production';

gulp.task('bundle', bundle('./src/js/app.js', './App/build', 'app.js'));
gulp.task('sass', sass(gulp, './src/scss/**/*.scss', './App/build/css', { watch: './src/scss/**/*.scss' }));
gulp.task('default', ['bundle', 'sass']);