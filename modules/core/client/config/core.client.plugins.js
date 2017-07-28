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
    moment.locale('ja');
    amMoment.changeLocale('ja');
  }
}());
