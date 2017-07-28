(function () {
  'use strict';

  angular
    .module('core')
    .config(pluginConfig)
    .run(runConfig);

  pluginConfig.$inject = ['cfpLoadingBarProvider', '$breadcrumbProvider', 'NotificationProvider'];

  function pluginConfig(cfpLoadingBarProvider, $breadcrumbProvider, NotificationProvider) {
    // Loading bar
    cfpLoadingBarProvider.includeSpinner = true;
    cfpLoadingBarProvider.latencyThreshold = 1;

    // Breadcrumb
    $breadcrumbProvider.setOptions({
      prefixStateName: 'home',
      includeAbstract: true,
      template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
    });

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

  function runConfig(amMoment) {
    moment.tz.add([
      'Asia/Tokyo|JST JDT|-90 -a0|010101010|-QJH0 QL0 1lB0 13X0 1zB0 NX0 1zB0 NX0|38e6',
      'Asia/Ho_Chi_Minh|LMT PLMT +07 +08 +09|-76.E -76.u -70 -80 -90|0123423232|-2yC76.E bK00.a 1h7b6.u 5lz0 18o0 3Oq0 k5b0 aW00 BAM0|90e5'
    ]);
    moment.tz.setDefault('Asia/Tokyo');
    moment.locale('ja');
    amMoment.changeLocale('ja');
  }
}());
