function TaskService(ApiService) {
  'ngInject';
  const Tasks = ApiService.all('admin/tasks');
  const service = {};

  // Return collection of users
  service.collection = function(query) {
    return Tasks.getList(query);
  };

  // Return a specific task by id
  service.getById = function(id) {
    return ApiService.one('admin/tasks', id).get();
  };

  service.create = function(task) {
    return Tasks.post(task);
  };

  return service;
}

export default {
  name: 'TaskService',
  fn: TaskService
};
