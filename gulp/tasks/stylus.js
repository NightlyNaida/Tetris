module.exports = function(){
    $.gulp.task('stylus',function () {
        return $.gulp.src('src/frontend/stylus/style.styl',{allowEmpty:true})
        .pipe($.sourcemaps.init())
        .pipe($.stylus({
            'include css': true
        }))
        .pipe($.autoprefixer({
            cascade: true
          }))
        .pipe($.csso({  
        }))
        .pipe($.sourcemaps.write())
        .pipe($.gulp.dest('build'))
    });
}