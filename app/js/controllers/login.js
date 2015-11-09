function LoginCtrl($scope, $state, AuthService, UserService) {
  'ngInject';
  // ViewModel
  const vm = this;

  vm.credentials = {};

  vm.submitPromise = null;

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
    $scope.loggedUser = userData;
    $state.go('dashboard.home');
  }

  vm.submit = function(form) {
    // continue if form is valid
    if (form.$valid) {
      vm.submitted = true;
      vm.submitPromise = AuthService
                          .authenticate(vm.credentials.email.toLowerCase(), vm.credentials.password)
                          .then(onAuthenticated)
                          .then(onGetUserSuccess);

      vm.submitPromise.catch(function() {
        vm.submitted = false;
      });

      return vm.submitPromise;
    }
  };
}

export default {
  name: 'LoginCtrl',
  fn: LoginCtrl
};
