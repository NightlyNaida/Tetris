module.exports = function(){
    $.gulp.task('serve', function() {
        $.browserSync.init({
            server: 'build'
        });
        $.browserSync.watch('build').on('change', $.browserSync.reload);
    });
}