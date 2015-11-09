'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import bs          from 'browser-sync';

const bsServer = bs.get(config.browserSync.appName);

gulp.task('data', function() {

  return gulp.src(config.data.src)
    .pipe(changed(config.data.dest)) // Ignore unchanged files
    .pipe(gulp.dest(config.data.dest))
    .pipe(bsServer.stream());

});
