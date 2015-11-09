/* eslint angular/on-watch: 0, new-cap: 0, no-new: 0 */
function OnRun($rootScope, $state, $timeout, AppSettings, Restangular, AuthService, UserService, RoleService) {
  'ngInject';

  $rootScope.$on('$stateChangeStart', () => {
    $rootScope.stateChanging = true;
  });

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.stateChanging = false;
    $rootScope.pageTitle = '';

    if (toState.title) {
      $rootScope.stateTitle = toState.title;
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;
  });

  $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
    $rootScope.stateChanging = false;
    if (error && error.type === AppSettings.errors.unauthorizedRequest) {
      AuthService.isAuthenticated(true).then(function(response) {
        if (response) {
          UserService.logout();
        }
      });
    }
  });

  // Add app title to rootScope
  $rootScope.appTitle = AppSettings.appTitle;

  // Set restangular Interceptors
  function logoutUser() {
    AuthService.destroy();
    if ($state.current.name !== 'public.login') {
      $state.go('public.login');
    }
  }

  /**
   * This is called when a 401 unauthorized response
   * is returned from API. This will mimic a ui-router
   * state change event, which will then call user.logout()
   * @param  {object} response  Raw response from the server.
   * @param  {Promise} deferred
   */
  function handleUnauthorized(response, deferred) {
    deferred.reject();
    logoutUser();

    // TODO: Needs flow improvements

    // // create a custom ui-router error for 401 unauthorized
    // const error = {
    //   type: AppSettings.error.unauthorizedRequest
    // };
    //
    // // manually trigger ui-router state change event passing in custom error
    // $rootScope.$broadcast('$stateChangeError', null, null, null, null, error);
  }

  function handleKnownErrors(response, deferred) {
    deferred.reject(response.data.error);
  }

  function handleUnknownErrors(response, deferred) {
    const _error = response.data ? response.data.error : false;
    deferred.reject(_error);
  }

  /**
   * If an expired access token error is triggered this
   * will catch it and logout the user
   *
   * see https://github.com/mgonto/restangular#seterrorinterceptor
   */
  function handleInvalidCredentialsOrExpiredToken(response, deferred) {
    /**
     * Remove auth information,
     * deferred request
     * go to login page
     */
    deferred.reject(response.data);
    logoutUser();
  }

  /**
   * Configure any request interceptors that we want to add to our
   * requests before sending to the API.
   *
   * see https://github.com/mgonto/restangular#addrequestinterceptor
   */
  Restangular.addRequestInterceptor(function(elem) {
    return elem;
  });

  /**
   * Configure custom error interceptors to handle any errors that
   * come back form the API.
   *
   * see https://github.com/mgonto/restangular#seterrorinterceptor
   */
  Restangular.setErrorInterceptor(function(response, deferred) {
    let stopErrorPropagation = false;

    switch (response.status) {
    case 401:
      handleUnauthorized(response, deferred);
      stopErrorPropagation = false;
      break;

    case 403:
      handleInvalidCredentialsOrExpiredToken(response, deferred);
      stopErrorPropagation = true;
      break;

    case 400:
    case 409:
      handleKnownErrors(response, deferred);
      stopErrorPropagation = false;
      break;

    default:
      handleUnknownErrors(response, deferred);
      stopErrorPropagation = false;
      break;
    }

    return !stopErrorPropagation;
  });

  // Initiate roles
  new RoleService(AppSettings.roles.guest, function() {
    const authenticated = AuthService.isAuthenticated();
    if (authenticated) {
      $timeout(function() {
        $state.go('dashboard.home');
      });
    }
    return !authenticated;
  });

  new RoleService(AppSettings.roles.admin, function() {
    return AuthService.isAuthenticated(true)
              .then(function() {
                return UserService.getSelf();
              }).catch(function() {
                $timeout(function() {
                  $state.go('public.login');
                });
              });
  });
}

export default OnRun;
