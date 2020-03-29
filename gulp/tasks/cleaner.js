module.exports = function(){
    $.gulp.task('cleaner-img',function(callback){
        var src = $.gulp.src(['build/img/*'], {read:false, allowEmpty: true})
        .pipe($.cleaner());
        return src
    });

    $.gulp.task('cleaner-svg',function(callback){
        var src = $.gulp.src(['build/svg/*'], {read:false, allowEmpty: true})
        .pipe($.cleaner());
        return src
    });
}