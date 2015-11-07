function EditUserCtrl(user) {
  'ngInject';
  // ViewModel
  const vm = this;

  vm.user = user;
}

export default {
  name: 'EditUserCtrl',
  fn: EditUserCtrl
};
