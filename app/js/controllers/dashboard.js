function DashboardCtrl($scope, $mdSidenav, AppService, UserService) {
  'ngInject';
  AppService.setLoggedUser();

  $scope.toggleLeftMenu = function() {
    $mdSidenav('left').toggle();
  };

  $scope.logout = function() {
    AppService.reset();
    UserService.logout();
  };
}

export default {
  name: 'DashboardCtrl',
  fn: DashboardCtrl
};
