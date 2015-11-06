/* eslint angular/on-watch: 0 */
function OnRun($rootScope, AppSettings) {
  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';

    if ( toState.title ) {
      $rootScope.stateTitle = toState.title;
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;
  });

  // Add app title to rootScope
  $rootScope.appTitle = AppSettings.appTitle;
}

export default OnRun;
