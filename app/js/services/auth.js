import store from 'store';

function AuthService($q, Restangular, AppSettings) {
  'ngInject';
  const service = {};
  const Oauth = Restangular.all('login');
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  };
  const storeKey = AppSettings.localStorageKeys.auth;
  let oauthToken;
  let token;

  /**
   * The workhorse; converts an object to x-www-form-urlencoded serialization.
   * @param {Object} obj
   * @return {String}
   */
  function param(obj) {
    let query = '';
    let name;
    let value;
    let fullSubName;
    let subName;
    let subValue;
    let innerObj;
    let i;

    for (name in obj) {
      if (obj.hasOwnProperty(name)) {
        value = obj[name];

        if (value instanceof Array) {
          for (i = 0; i < value.length; ++i) {
            subValue = value[i];
            fullSubName = name + '[' + i + ']';
            innerObj = {};
            innerObj[fullSubName] = subValue;
            query += param(innerObj) + '&';
          }
        } else if (value instanceof Object) {
          for (subName in value) {
            if (value.hasOwnProperty(subName)) {
              subValue = value[subName];
              fullSubName = name + '[' + subName + ']';
              innerObj = {};
              innerObj[fullSubName] = subValue;
              query += param(innerObj) + '&';
            }
          }
        } else if (angular.isDefined(value) && value !== null) {
          query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
        }
      }
    }

    return query.length ? query.substr(0, query.length - 1) : query;
  }

  function saveAuth(data) {
    token = data.access_token;

    store.set(storeKey, {
      access_token: data.access_token,
      refresh_token: data.refresh_token
    });
  }

  /**
   * Clear all references to Restangular auth elements
   * used during authenticate and refresh calls.
   */
  function authComplete() {
    oauthToken = null;
  }

  function isStoreEmpty() {
    return angular.isUndefined(store.get(storeKey));
  }

  function getAccessToken() {
    if (isStoreEmpty()) {
      return undefined;
    }

    return store.get(storeKey).access_token;
  }

  token = getAccessToken();

  service.isAuthenticated = function(promisify) {
    if (angular.isUndefined(promisify) || !promisify) {
      return angular.isDefined(token);
    }

    const deferred = $q.defer();

    if (angular.isDefined(token)) {
      deferred.resolve(token);
    } else {
      deferred.resolve(false);
    }

    return deferred.promise;
  };

  service.authenticate = function(username, password) {
    if (oauthToken) {
      return oauthToken;
    }

    const data = param({
      username: username,
      password: password,
      grant_type: 'password',
      scope: 'full'
    });

    oauthToken = Oauth
      .post(data, null, headers)
      .then(saveAuth)
      .finally(authComplete);

    return oauthToken;
  };

  service.getAuthHeader = function() {
    return {
      'Authorization': 'Bearer ' + getAccessToken()
    };
  };

  service.destroy = function() {
    token = undefined;
    store.remove(storeKey);
  };

  return service;
}

export default {
  name: 'AuthService',
  fn: AuthService
};
