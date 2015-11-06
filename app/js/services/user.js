function UserService($resource) {
  const service = {};
  const resource = $resource('/data/users.json');

  service.collection = function() {
    return resource.query();
  };

  return service;
}

export default {
  name: 'UserService',
  fn: UserService
};
