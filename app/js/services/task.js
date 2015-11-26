function TaskService(ApiService) {
  'ngInject';
  const Users = ApiService.all('admin/tasks');
  const service = {};

  // Return collection of users
  service.collection = function(query) {
    return Users.getList(query);
  };

  // Return a specific user by id
  service.userById = function(id) {
    return ApiService.one('users', id).get();
  };

  return service;
}

export default {
  name: 'TaskService',
  fn: TaskService
};
