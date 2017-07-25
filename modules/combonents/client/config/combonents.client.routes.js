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
        templateUrl: 'modules/combonents/client/views/buttons.client.view.html'
      })
      .state('combonents.social', {
        url: '/social',
        templateUrl: 'modules/combonents/client/views/social.client.view.html'
      })
      .state('combonents.cards', {
        url: '/cards',
        templateUrl: 'modules/combonents/client/views/cards.client.view.html'
      })
      .state('combonents.forms', {
        url: '/forms',
        templateUrl: 'modules/combonents/client/views/forms.client.view.html'
      })
      .state('combonents.switches', {
        url: '/switches',
        templateUrl: 'modules/combonents/client/views/switches.client.view.html'
      })
      .state('combonents.tables', {
        url: '/tables',
        templateUrl: 'modules/combonents/client/views/tables.client.view.html'
      })
      .state('combonents.login', {
        url: '/login',
        templateUrl: 'modules/combonents/client/views/login.client.view.html'
      })
      .state('combonents.register', {
        url: '/register',
        templateUrl: 'modules/combonents/client/views/register.client.view.html'
      })
      .state('combonents.404', {
        url: '/404',
        templateUrl: 'modules/combonents/client/views/404.client.view.html'
      })
      .state('combonents.500', {
        url: '/500',
        templateUrl: 'modules/combonents/client/views/500.client.view.html'
      });
  }
}());
