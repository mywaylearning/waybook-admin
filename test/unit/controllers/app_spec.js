/*global angular */

'use strict';

describe('Unit: AppCtrl', function() {

  var ctrl, scope;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    angular.mock.inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('AppCtrl', { $scope: scope });
    });
  });

  it('should exist', function() {
    expect(ctrl).toBeDefined();
  });

  // it('should have a title variable equal to \'AngularJS, Gulp, and Browserify!\'', function() {
  //   expect(ctrl.title).toEqual('AngularJS, Gulp, and Browserify! Written with keyboards and love!');
  // });

});
