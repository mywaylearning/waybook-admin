function ExplorationService(ApiService) {
  'ngInject';
  const Explorations = ApiService.all('explorations');
  const service = {};

  // Return collection of users
  service.collection = function() {
    return Explorations.getList();
  };

  return service;
}

export default {
  name: 'ExplorationService',
  fn: ExplorationService
};
