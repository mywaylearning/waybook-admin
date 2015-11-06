function UserService($window, $state, ApiService, AuthService) {
  const Users = ApiService.all('users');
  const User = ApiService.one('user');
  const service = {};

  let userObj = undefined;
  let userRequest = null;

  /**
   * Store user information in userObj
   */
  function setUser(user) {
    userObj = user;
  }

  /**
   * Clear all references to Restangular user elements
   * used during get user calls.
   */
  function getUserComplete() {
    userRequest = null;
  }

  // Return collection of users
  service.collection = function() {
    return Users.getList();
  };

  // Return a specific user by id
  service.userById = function(id) {
    return Users.one(id);
  }

  /**
   * Helper method to retreive logged in user's information.
   * Will first check to see that user is authenticated before
   * trying to retreive the user object from API.
   *
   * @return {mixed} -  empty object if unautenticated

   *                    Promise if authenticated
   */
  service.currentUser = function(forceRefresh) {
    return AuthService.isAuthenticated() ? this.getSelf(forceRefresh) : {};
  };

  service.getSelf = function(forceRefresh) {
    if (userObj && !forceRefresh) {
      // return utils.promisify(userObj);
    }

    if (userRequest) {
      return userRequest;
    }

    userRequest = User.customGET();
    userRequest.then(setUser).finally(getUserComplete);

    return userRequest;
  };

  /**
   * Logout out the authenticated user.
   * Will delete the access token, user info,
   * and redirect to logged out page.
   */
  service.logout = function() {
    AuthService.destroy();
    userObj = undefined;
    userRequest = null;

    $state.go('public.login');
  };

  return service;
}

export default {
  name: 'UserService',
  fn: UserService
};
