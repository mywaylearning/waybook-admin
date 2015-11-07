'use strict';

import config from '../config';
import gulp   from 'gulp';
import revReplace from 'gulp-rev-replace';

gulp.task('revreplace', function(cb) {

  var manifest = gulp.src(config.buildDir + '/rev-manifest.json');

  return gulp.src(config.sourceDir + 'index.html')
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest(config.buildDir));

});
