function HomeCtrl() {
  'ngInject';
  // ViewModel
  const vm = this;

  vm.stats = 10;
}

export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};
