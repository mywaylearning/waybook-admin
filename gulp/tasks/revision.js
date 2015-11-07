'use strict';

import config from '../config';
import gulp   from 'gulp';
import RevAll from 'gulp-rev-all';

gulp.task('revision', function(cb) {

  var revAll = new RevAll();

  return gulp.src([config.buildDir + 'css/main.css', config.buildDir + 'js/main.js'])
    .pipe(revAll.revision())
    .pipe(gulp.dest(config.buildDir))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest(config.buildDir));

});
