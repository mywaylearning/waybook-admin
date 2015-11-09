function OnConfig($mdThemingProvider, RestangularProvider, AppSettings) {
  'ngInject';

  $mdThemingProvider.definePalette('app-blue', $mdThemingProvider.extendPalette('blue', {
    '50': '#DCEFFF',
    '100': '#AAD1F9',
    '200': '#7BB8F5',
    '300': '#4C9EF1',
    '400': '#1C85ED',
    '500': '#106CC8',
    '600': '#0159A2',
    '700': '#025EE9',
    '800': '#014AB6',
    '900': '#013583',
    'contrastDefaultColor': 'light',
    'contrastDarkColors': '50 100 200 A100',
    'contrastStrongLightColors': '300 400 A200 A400'
  }));

  $mdThemingProvider.theme('default')
    .primaryPalette('app-blue')
    .accentPalette('pink');

  // Restangular config
  /**
   *  Set default base url
   */
  RestangularProvider.setBaseUrl(AppSettings.authUrl);

  /**
   *  Set default request headers
   */
  RestangularProvider.setDefaultHeaders({
    'Content-Type': 'application/json'
  });
}

export default OnConfig;
