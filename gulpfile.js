'use strict';

global.$ = {
    gulp: require('gulp'),
    stylus: require('gulp-stylus'),
    csso: require('gulp-csso'),
    autoprefixer: require('gulp-autoprefixer'),
    notify: require('gulp-notify'),
    sourcemaps: require('gulp-sourcemaps'),
    browserSync: require('browser-sync').create(),
    concat: require('gulp-concat'),
    cleaner: require('gulp-clean'),
    path: {
        tasks: require('./gulp/config/tasks.js')
    }
};

$.path.tasks.forEach(function (taskPath) {
    require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
    $.gulp.series('images','svg','fonts'),
    $.gulp.parallel('stylus','scripts-ex','script'),
    $.gulp.parallel('watch','serve')  
));

 /*$.gulp.task('getIamges', function(callback){
   var fs = require("fs");
    var files =  fs.readdirSync("src/img/");
    console.log(files);
    callback();
})*/

