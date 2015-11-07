function AppCtrl($scope, AppService) {
  'ngInject';
  AppService.init($scope);
}

export default {
  name: 'AppCtrl',
  fn: AppCtrl
};
