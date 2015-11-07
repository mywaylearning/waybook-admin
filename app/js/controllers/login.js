function LoginCtrl($scope, AuthService, UserService, $state) {
  'ngInject';
  // ViewModel
  const vm = this;

  vm.credentials = {};

  /**
   * On successful user authentication make a call to get user object.
   * @return {Promise}
   */
  function onAuthenticated() {
    return UserService.getSelf();
  }

  /**
   * Once the user object has been received upate the AppController user object.
   * Then redirect to logged in state.
   */
  function onGetUserSuccess(userData) {
    vm.errorsData = {};

    $scope.loggedUser = userData;
    $state.go('dashboard.home');
  }

  vm.submit = function() {
    AuthService.authenticate(vm.credentials.email.toLowerCase(), vm.credentials.password)
    .then(onAuthenticated)
    .then(onGetUserSuccess);
  };
}

export default {
  name: 'LoginCtrl',
  fn: LoginCtrl
};
