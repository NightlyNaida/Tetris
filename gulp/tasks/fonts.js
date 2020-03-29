module.exports = function(){
    $.gulp.task('fonts',function () {
        return $.gulp.src('src/frontend/fonts/**', {base:'src/frontend/'})
        .pipe($.gulp.dest('build'))
    });
}
