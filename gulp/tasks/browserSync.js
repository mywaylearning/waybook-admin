'use strict';

import config      from '../config';
import url         from 'url';
import bs          from 'browser-sync';
import gulp        from 'gulp';

const bsServer = bs.create(config.browserSync.appName);

gulp.task('browserSync', function() {

  const DEFAULT_FILE = 'index.html';
  const ASSET_EXTENSIONS = ['js', 'css', 'png', 'jpg', 'jpeg', 'gif', 'json'];

  bsServer.init({
    server: {
      baseDir: config.buildDir,
      middleware: function(req, res, next) {
        // let fileHrefArray = url.parse(req.url).href.split('.');
        // let fileExtension = fileHrefArray[fileHrefArray.length - 1];
        // let fileExtensionRegex = new RegExp(fileExtension, 'g');
        //
        // ASSET_EXTENSIONS.forEach(function(extension) {
        //   if (fileExtensionRegex.test(extension)) {
        //     req.url = '/' + DEFAULT_FILE;
        //   }
        // });

        return next();
      }
    },
  	port: config.browserSync.browserPort,
  	ui: {
    	port: config.browserSync.UIPort
    },
    ghostMode: {
      links: false
    }
  });

});
