function HomeCtrl() {
  // ViewModel
  const vm = this;

  vm.stats = Math.random().toFixed(2);
}

export default {
  name: 'HomeCtrl',
  fn: HomeCtrl
};
