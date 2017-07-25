(function () {
  'use strict';

  angular
    .module('core')
    .config(pluginConfig);

  pluginConfig.$inject = ['cfpLoadingBarProvider', '$breadcrumbProvider'];

  function pluginConfig(cfpLoadingBarProvider, $breadcrumbProvider) {
    // Loading bar
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 1;

    // Breadcrumb
    $breadcrumbProvider.setOptions({
      prefixStateName: 'app.main',
      includeAbstract: true,
      template: '<li class="breadcrumb-item" ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}">{{step.ncyBreadcrumbLabel}}</a><span ng-switch-when="true">{{step.ncyBreadcrumbLabel}}</span></li>'
    });
  }
}());
