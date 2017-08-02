(function (window) {
  'use strict';

  var applicationModuleName = 'mean';
  var plugins = [
    'ngResource',
    'ngAnimate',
    'ngMessages',
    'ui.router',
    'ui.bootstrap',
    'ngFileUpload',
    'ngImgCrop',
    'ui-notification',
    'ncy-angular-breadcrumb',
    'angular-loading-bar',
    'angularMoment',
    'ngDialog',
    'angucomplete-alt'
  ];
  var service = {
    applicationEnvironment: window.env,
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: plugins,
    registerModule: registerModule
  };

  window.ApplicationConfiguration = service;

  // Add a new vertical module
  function registerModule(moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  }
}(window));
