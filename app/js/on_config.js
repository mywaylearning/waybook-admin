/* global angular */

function OnConfig($stateProvider, $locationProvider, $urlRouterProvider) {
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('public', {
    url: '/',
    abstract: true,
    template: '<div ui-view></div>'
  })

  .state('public.login', {
    url: '',
    templateUrl: 'login.html',
    controller: 'LoginCtrl as login',
    title: 'Login'
  })

  .state('dashboard', {
    url: '/dashboard',
    abstract: true,
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl as dashboard'
  })

  .state('dashboard.home', {
    url: '',
    templateUrl: 'dashboard/home.html',
    controller: 'HomeCtrl as home',
    title: 'Dashboard'
  })

  .state('dashboard.users', {
    url: '/users',
    templateUrl: 'dashboard/users.html',
    controller: 'UsersCtrl as users',
    title: 'Users',
    resolve: {
      collection: function(UserService) {
        return UserService.collection();
      }
    }
  })

  .state('dashboard.users.edit', {
    url: '/edit/{id}',
    templateUrl: 'dashboard/edit-user.html',
    controller: 'EditUserCtrl as editUser',
    title: 'Edit user',
    resolve: {
      user: function(UserService, $q, $stateParams) {
        const deferred = $q.defer();
        UserService.collection().$promise.then(function(users) {
          angular.forEach(users, function(user) {
            if (parseInt($stateParams.id, 10) === user.id) {
              deferred.resolve(user);
            }
          });
        });

        return deferred.promise;
      }
    }
  });

  $urlRouterProvider.otherwise('/');
}

export default OnConfig;
