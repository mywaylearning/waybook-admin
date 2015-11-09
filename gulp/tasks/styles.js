'use strict';

import config       from '../config';
import gulp         from 'gulp';
import gulpif       from 'gulp-if';
import sourcemaps   from 'gulp-sourcemaps';
import sass         from 'gulp-sass';
import cssImport    from 'gulp-cssimport';
import handleErrors from '../util/handleErrors';
import bs           from 'browser-sync';
import autoprefixer from 'gulp-autoprefixer';

const bsServer = bs.get(config.browserSync.appName);

gulp.task('styles', function () {

  const createSourcemap = !global.isProd || config.styles.prodSourcemap;

  return gulp.src(config.styles.src)
    .pipe(gulpif(createSourcemap, sourcemaps.init()))
    .pipe(sass({
      sourceComments: !global.isProd,
      outputStyle: global.isProd ? 'compressed' : 'nested',
      includePaths: config.styles.sassIncludePaths
    }))
    .pipe(cssImport())
    .on('error', handleErrors)
    .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
    .pipe(gulpif(
      createSourcemap,
      sourcemaps.write( global.isProd ? './' : null ))
    )
    .pipe(gulp.dest(config.styles.dest))
    .pipe(bsServer.stream());

});
