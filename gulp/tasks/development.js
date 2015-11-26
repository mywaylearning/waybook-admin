'use strict';

import gulp        from 'gulp';
import runSequence from 'run-sequence';

gulp.task('dev', ['clean'], function(cb) {

  global.isProd = false;

  runSequence('views', ['styles', 'images', 'fonts', 'data', 'browserify'], 'watch', cb);

});
