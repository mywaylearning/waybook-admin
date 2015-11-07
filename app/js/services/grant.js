function GrantService($q) {
  'ngInject';
  const service = {};
  const roles = [];

  function authorize(whichRoles, states, resolveIfMatch, stateParams) {
    const matches = [];
    const _whichRoles = !angular.isArray(whichRoles) ? [whichRoles] : whichRoles;
    const _states = !angular.isArray(states) ? [states] : states;
    let stateTo;
    let deferred;

    // find the roles we are trying to authorize
    roles.forEach(function(role, index) {
      _whichRoles.forEach(function(roleName) {
        if (roleName === role.name) {
          // if state params from the state were passed
          // make sure the role has access to them
          role.setStateParams(stateParams);

          // attempt to match this role with an accompanying
          // stateTo from the states array, if a match can not
          // be found default to the first stateTo in states
          stateTo = _states[index - 1] || _states[0];

          matches.push(role.validate(stateTo, resolveIfMatch));
        }
      });
    });

    deferred = $q.defer();
    $q.all(matches)
      .then(function(results) {
        deferred.resolve(results);
      })
      .catch(function(err) {
        deferred.reject(err);
      });

    return deferred.promise;
  }

  service.addRole = function(role) {
    if (this.hasRole(role.name)) {
      throw new Error('GrantService: Unable to add role because "' + role.name + '" role already exists!');
    }

    roles.push(role);
  };

  service.hasRole = function(roleName) {
    return roles.some(function(role) {
      return (role.name === roleName);
    });
  };

  service.only = function(_roles, states, stateParams) {
    return authorize(_roles, states, true, stateParams);
  };

  service.except = function(_roles, states, stateParams) {
    return authorize(_roles, states, false, stateParams);
  };

  return service;
}

export default {
  name: 'GrantService',
  fn: GrantService
};
