/*global angular */

'use strict';

describe('Unit: HomeCtrl', function() {

  var ctrl, scope;

  beforeEach(function() {
    // instantiate the app module
    angular.mock.module('app');

    angular.mock.inject(function($controller, $rootScope) {
      scope = $rootScope.$new();
      ctrl = $controller('HomeCtrl', { $scope: scope });
    });
  });

  it('should exist', function() {
    expect(ctrl).toBeDefined();
  });

  it('should have a stats variable equal to 10', function() {
    expect(ctrl.stats).toEqual(10);
  });

});
