module.exports = function(){
    $.gulp.task('images',function(){
        return $.gulp.src('src/frontend/img/**', {base: 'src/frontend/'}) //base для миграции всей папки
        .pipe($.gulp.dest('build'))
    });

    $.gulp.task('svg',function(){
        return $.gulp.src('src/frontend/svg/*.*', {base: 'src/frontend/'})
        .pipe($.gulp.dest('build'))
    })
}