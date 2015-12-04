function TasksCtrl($scope, $state, collection) {
  'ngInject';

  // Sort collection before ng-repeat (since it's using a sort directive, we can't use orderBy)
  collection.sort(function(a, b) {
    return a.order - b.order;
  });

  $scope.collection = collection;

  $scope.saveTasks = function(form) {
    const tasksLength = $scope.collection.length;
    let tasksSaved = 0;
    angular.forEach($scope.collection, function(task, index) {
      task.order = index;
      task.save().then(function() {
        tasksSaved++;

        if (tasksSaved === tasksLength) {
          $scope.saved = true;
          $scope.orderChanged = false;
          form.$dirty = false;
        }
      });
    });
  };

  $scope.saved = false;
  $scope.orderChanged = false;

  $scope.onOrderChange = function() {
    $scope.orderChanged = true;
  };

  $scope.checkForm = function(form) {
    if (form.$dirty || $scope.orderChanged) {
      if ($scope.saved === true) {
        $scope.saved = false;
      }

      return false;
    }
    return true;
  };

  $scope.editTask = function(task, $event) {
    $event.stopPropagation();
    $state.go('dashboard.tasks.edit', { id: task.id });
  };
}

export default {
  name: 'TasksCtrl',
  fn: TasksCtrl
};
