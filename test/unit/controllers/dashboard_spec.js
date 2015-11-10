/*global angular */

'use strict';

describe('Unit: DashboardCtrl', function() {

  var appCtrl, dashboardCtrl, appScope, dashboardScope, $mdSidenav,
  mock__mdSidenav = function(component) {
    var spy = jasmine.createSpy('mdSidenav');
    return {
      isMock: true,
      toggle: spy
    }
  };

  beforeEach(function() {

    module(function($provide) {
      $provide.value('$mdSidenav', mock__mdSidenav);
    })

    // instantiate the app module
    angular.mock.module('app');

    angular.mock.inject(function($controller, $rootScope) {
      appScope = $rootScope.$new();
      appCtrl = $controller('AppCtrl', { $scope: appScope });
    });

    angular.mock.inject(function($controller, $rootScope) {
      dashboardScope = appScope.$new();
      $mdSidenav = mock__mdSidenav;
      dashboardCtrl = $controller('DashboardCtrl', {
        $scope: dashboardScope,
        $mdSidenav: mock__mdSidenav
      });
    });
  });

  it('should exist', function() {
    expect(dashboardCtrl).toBeDefined();
  });

  // it('should call $mdSidenav(\'left\').toggle() on toggleLeftMenu()', function() {
  //   var _mdSidenav = $mdSidenav('left');
  //
  //   console.log(_mdSidenav.toggle());
  //   dashboardScope.toggleLeftMenu();
  //   //
  //   expect(_mdSidenav.toggle).toHaveBeenCalled();
  // });

  // it('should have a title variable equal to \'AngularJS, Gulp, and Browserify!\'', function() {
  //   expect(ctrl.title).toEqual('AngularJS, Gulp, and Browserify! Written with keyboards and love!');
  // });

});
