(function () {
  'use strict';

  angular
    .module('core')
    .config(pluginConfig)
    .run(scopeConfig);

  pluginConfig.$inject = ['cfpLoadingBarProvider', 'NotificationProvider'];
  scopeConfig.$inject = ['$rootScope', '$state', '$stateParams'];

  function pluginConfig(cfpLoadingBarProvider, NotificationProvider) {
    // Loading bar
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 1;

    // Notification
    NotificationProvider.setOptions({
      delay: 2000,
      startTop: 20,
      startRight: 10,
      verticalSpacing: 20,
      horizontalSpacing: 20,
      positionX: 'right',
      positionY: 'bottom'
    });
  }

  function scopeConfig($rootScope, $state, $stateParams) {
    // $rootScope.$on('$stateChangeSuccess', function () {
    //   document.body.scrollTop = document.documentElement.scrollTop = 0;
    // });
    // $rootScope.$state = $state;
    // $rootScope.$stateParams = $stateParams;
    return;
  }
}());
