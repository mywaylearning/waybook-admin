function ApiService(Restangular, AuthService, AppSettings) {
  'ngInject';
  function restangularConfig(RestangularConfigurer) {
    /**
     *  Set api base url
     */
    RestangularConfigurer.setBaseUrl(AppSettings.apiUrl);
  }

  const service = Restangular.withConfig(restangularConfig);

  service.addFullRequestInterceptor(function() {
    return {
      headers: AuthService.getAuthHeader()
    };
  });

  return service;
}

export default {
  name: 'ApiService',
  fn: ApiService
};
