function AppService(UserService) {
  const service = {};
  let scope;

  service.init = function($scope) {
    scope = $scope;
    this.reset();
  };

  service.setLoggedUser = function() {
    scope.loggedUser = UserService.currentUser().$object;
  };

  service.reset = function() {
    scope.loggedUser = {};
  };

  return service;
}

export default {
  name: 'AppService',
  fn: AppService
};
