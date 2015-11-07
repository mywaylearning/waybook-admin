function DashboardCtrl($scope, AppService, UserService) {
  'ngInject';
  AppService.setLoggedUser();

  $scope.logout = function() {
    AppService.reset();
    UserService.logout();
  };
}

export default {
  name: 'DashboardCtrl',
  fn: DashboardCtrl
};
