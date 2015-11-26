function OnConfig($stateProvider, $urlRouterProvider, AppSettings) {
  'ngInject';
  // Routes and states config
  $stateProvider
  .state('public', {
    url: '/',
    abstract: true,
    template: '<span ui-view></span>',
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
    abstract: true,
    template: '<span ui-view></span>'
  })

  .state('dashboard.users.list', {
    url: '',
    templateUrl: 'dashboard/users/users.html',
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
    templateUrl: 'dashboard/users/edit.html',
    controller: 'EditUserCtrl as editUser',
    title: 'Edit user',
    resolve: {
      user: function(UserService, $stateParams) {
        return UserService.userById($stateParams.id);
      }
    }
  })

  .state('dashboard.tasks', {
    url: '/tasks',
    abstract: true,
    template: '<span ui-view></span>'
  })

  .state('dashboard.tasks.list', {
    url: '',
    templateUrl: 'dashboard/tasks/tasks.html',
    controller: 'TasksCtrl as tasks',
    title: 'Guide me Tasks',
    resolve: {
      collection: function(TaskService) {
        return TaskService.collection();
      }
    }
  });

  $urlRouterProvider.otherwise('/');
}

export default OnConfig;
