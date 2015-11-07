/* eslint angular/window-service: 0, angular/di: 0 */

import angular from 'angular';

// angular modules
import 'angular-ui-router';
import 'angular-messages';
import 'restangular';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';

window._ = require('lodash');

// Import angular config and run
import constants from './constants';
import config from './on_config';
import run from './on_run';


// create and bootstrap application
const requires = [
  'ui.router',
  'ngMessages',
  'restangular',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', constants);

angular.module('app').config(config);

angular.module('app').run(run);

angular.bootstrap(document, ['app']);
