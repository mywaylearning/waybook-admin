function TaskFormCtrl($state, task, explorations, TaskService) {
  'ngInject';
  // ViewModel
  const vm = this;

  vm.task = {
    tags: []
  };

  vm.explorations = explorations;

  if (task) {
    vm.edit = true;
    vm.task = task;

    if (!vm.task.tags || !angular.isArray(vm.task.tags)) {
      vm.task.tags = [];
    }
  }

  vm.save = function(form) {
    if (form.$invalid) {
      return;
    }

    if (vm.edit) {
      vm.task.save().then(function() {
        $state.go('dashboard.tasks.list');
      });
    } else {
      TaskService.create(vm.task).then(function() {
        $state.go('dashboard.tasks.list');
      });
    }
  };
}

export default {
  name: 'TaskFormCtrl',
  fn: TaskFormCtrl
};
