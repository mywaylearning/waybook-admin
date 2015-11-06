function AppCtrl($scope, AppService) {
  AppService.init($scope);
}

export default {
  name: 'AppCtrl',
  fn: AppCtrl
};
