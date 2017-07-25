(function () {
  'use strict';

  angular
    .module('combonents')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('combonents', {
        abstract: true,
        url: '/combonents',
        template: '<ui-view/>'
      })
      .state('combonents.buttons', {
        url: '/buttons',
        template: '<h1>buttons</h1>'
      })
      .state('combonents.social', {
        url: '/social',
        template: '<h1>social</h1>'
      })
      .state('combonents.cards', {
        url: '/cards',
        template: '<h1>cards</h1>'
      })
      .state('combonents.forms', {
        url: '/forms',
        template: '<h1>forms</h1>'
      })
      .state('combonents.switches', {
        url: '/switches',
        template: '<h1>switches</h1>'
      })
      .state('combonents.tables', {
        url: '/tables',
        template: '<h1>tables</h1>'
      })
      .state('combonents.login', {
        url: '/login',
        template: '<h1>login</h1>'
      })
      .state('combonents.register', {
        url: '/register',
        template: '<h1>register</h1>'
      })
      .state('combonents.404', {
        url: '/404',
        template: '<h1>404</h1>'
      })
      .state('combonents.500', {
        url: '/500',
        template: '<h1>500</h1>'
      });
  }
}());
