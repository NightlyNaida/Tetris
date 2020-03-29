module.exports = function(){
    $.gulp.task('scripts-ex',function () {
        return $.gulp.src(['node_modules/jquery/dist/jquery.min.js'])//массив при условии, что будет добавлена сторонняя библиотека
        .pipe($.concat('libs.min.js'))
        .pipe($.gulp.dest('build'))
    });

    $.gulp.task('script',function () {
        return $.gulp.src('src/frontend/js/*.js')
        .pipe($.gulp.dest('build'))
    });
}