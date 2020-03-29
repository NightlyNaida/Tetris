module.exports = function(){   
    $.gulp.task('watch', function() {
        $.gulp.watch('src/frontend/pug/**/*.pug', $.gulp.series('pug'))
        $.gulp.watch('src/frontend/stylus/**/*.styl', $.gulp.series('stylus'))
        $.gulp.watch('src/frontend/js/*.js', $.gulp.series('script'))
        $.gulp.watch('src/frontend/img', $.gulp.series('cleaner-img','images','pug'))
        $.gulp.watch('src/frontend/svg', $.gulp.series('cleaner-svg','svg','pug'))
    });
}