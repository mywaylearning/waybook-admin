function UsersCtrl($scope, $state, collection, $mdDialog, UserService) {
  'ngInject';

  let bookmark;
  let firstRun = true;

  $scope.collection = collection;

  $scope.tableControl = {
    selected: [],
    order: 'firstName'
  };

  $scope.filter = {
    options: {
      debounce: 500
    }
  };

  $scope.query = {
    search: ''
  };

  function success(_collection) {
    $scope.collection = _collection;
  }

  $scope.onChange = function() {
    return UserService.collection($scope.query).then(success);
  };

  function getUsers() {
    $scope.deferred = $scope.onChange();
  }

  $scope.removeFilter = function() {
    $scope.filter.show = false;
    $scope.query.search = '';

    if ($scope.filter.form.$dirty) {
      $scope.filter.form.$setPristine();
    }
  };

  $scope.$watch('query.search', function(newValue, oldValue) {
    if (!firstRun) {
      getUsers();
    }

    if (!oldValue) {
      bookmark = $scope.query.page;
    }

    if (newValue !== oldValue) {
      $scope.query.page = 1;
    }

    if (!newValue) {
      $scope.query.page = bookmark;
    }

    firstRun = false;
  });

  $scope.editUser = function(event, user) {
    event.preventDefault();
    event.stopPropagation();
    $state.go('dashboard.users.edit', { id: user.id });
  };

  $scope.delete = function(event) {
    event.preventDefault();

    const usersToDelete = $scope.tableControl.selected;

    // Appending dialog to document.body to cover sidenav in docs app
    const confirm = $mdDialog.confirm()
          .title('Are you sure?')
          .content(`You are trying to delete ${usersToDelete.length} ${usersToDelete.length > 1 ? 'users' : 'user'}.`)
          .ariaLabel('Delete users')
          .targetEvent(event)
          .ok('Yes')
          .cancel('Cancel').
          theme('inverse');

    $mdDialog.show(confirm).then(function() {
      angular.forEach(usersToDelete, function(user) {
        user.remove().then(function() {
          $scope.collection.splice($scope.collection.indexOf(user), 1);
        });
      });
    });
  };
}

export default {
  name: 'UsersCtrl',
  fn: UsersCtrl
};
