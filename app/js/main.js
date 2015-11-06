/* eslint angular/window-service: 0, angular/di: 0 */

import angular from 'angular';

// angular modules
import 'angular-ui-router';
import 'angular-resource';
import 'angular-messages';
import 'restangular';
import './templates';
import './filters';
import './controllers';
import './services';
import './directives';

window._ = require('lodash');

// create and bootstrap application
const requires = [
  'ui.router',
  'ngMessages',
  'ngResource',
  'restangular',
  'templates',
  'app.filters',
  'app.controllers',
  'app.services',
  'app.directives'
];

// mount on window for testing
window.app = angular.module('app', requires);

angular.module('app').constant('AppSettings', require('./constants'));

angular.module('app').config(require('./on_config'));

angular.module('app').run(require('./on_run'));

angular.bootstrap(document, ['app']);
