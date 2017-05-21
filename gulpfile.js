var gulp = require('gulp')
var exec = require('child_process').exec

gulp.task('vendor', function () {
  gulp.src('node_modules/weui-wxss/dist/style/weui.wxss')
    .pipe(gulp.dest('app/vendor'))
  gulp.src('node_modules/async/dist/async.js')
    .pipe(gulp.dest('app/vendor'))
})

gulp.task('watch', function () {
  gulp.watch('app/**/*.js', function (event) {
    exec('node_modules/.bin/standard --fix ' + event.path)
    console.log('File ' + event.path + ' was ' + event.type + '.')
  })
})
