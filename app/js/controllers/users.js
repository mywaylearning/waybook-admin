function UsersCtrl(collection) {
  // ViewModel
  const vm = this;

  vm.collection = collection;

  vm.remove = function(user) {
    if (confirm(`Removing ${user.firstName}. Are you sure?`)) {
      vm.collection.splice(vm.collection.indexOf(user), 1);
    }
  };
}

export default {
  name: 'UsersCtrl',
  fn: UsersCtrl
};
