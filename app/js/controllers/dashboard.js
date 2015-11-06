function DashboardCtrl($scope, AppService, UserService) {
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
