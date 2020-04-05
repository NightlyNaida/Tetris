module.exports = function(){   
    $.gulp.task('watch', function() {
        $.gulp.watch('src/frontend/stylus/**/*.styl', $.gulp.series('stylus'))
        $.gulp.watch('src/frontend/js/*.js', $.gulp.series('script'))
        $.gulp.watch('src/frontend/img', $.gulp.series('cleaner-img','images'))
        $.gulp.watch('src/frontend/svg', $.gulp.series('cleaner-svg','svg'))
    });
}