'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import browserSync from 'browser-sync';

gulp.task('data', function() {

  return gulp.src(config.data.src)
    .pipe(changed(config.data.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.data.dest))
    .pipe(browserSync.stream({ once: true }));

});
