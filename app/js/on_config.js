function OnConfig($stateProvider, $locationProvider, $urlRouterProvider, RestangularProvider, AppSettings) {
  // Routes and states config
  $locationProvider.html5Mode(true);

  $stateProvider
  .state('public', {
    url: '/',
    abstract: true,
    template: '<div ui-view></div>',
    resolve: {
      guestGrant: function(GrantService) {
        return GrantService.only([AppSettings.roles.guest], ['public']);
      }
    }
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
    controller: 'DashboardCtrl as dashboard',
    resolve: {
      adminGrant: function(GrantService) {
        return GrantService.only([AppSettings.roles.admin], ['dashboard']);
      }
    }
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
      user: function(UserService, $stateParams) {
        return UserService.userById($stateParams.id);
      }
    }
  });

  $urlRouterProvider.otherwise('/');

  // Restangular config
  /**
   *  Set default base url
   */
  RestangularProvider.setBaseUrl(AppSettings.authUrl);

  /**
   *  Set default request headers
   */
  RestangularProvider.setDefaultHeaders({
    'Content-Type': 'application/json'
  });
}

export default OnConfig;
