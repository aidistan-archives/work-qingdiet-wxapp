var gulp = require('gulp')
var exec = require('child_process').exec

gulp.task('watch', function () {
  gulp.watch('app/**/*.js', function (event) {
    exec('node_modules/.bin/standard --fix ' + event.path)
    console.log('File ' + event.path + ' was ' + event.type + '.')
  })
})
