function UtilsService($q) {
  const service = {};

  service.promisify = function(value) {
    const deferred = $q.defer();

    deferred.promise.$object = value;

    deferred.resolve(value);

    return deferred.promise;
  };

  return service;
}

export default {
  name: 'UtilsService',
  fn: UtilsService
};
