(function () {
  'use strict';

  angular
    .module('combonents')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('combonents', {
        abstract: true,
        url: '/combonents',
        ncyBreadcrumb: {
          label: 'combonents'
        },
        template: '<ui-view></ui-view>'
      })
      .state('combonents.buttons', {
        url: '/buttons',
        templateUrl: '/modules/combonents/client/views/buttons.client.view.html',
        ncyBreadcrumb: {
          label: 'Buttons'
        }
      })
      .state('combonents.social-buttons', {
        url: '/social',
        templateUrl: '/modules/combonents/client/views/social.client.view.html',
        ncyBreadcrumb: {
          label: 'Social Buttons'
        }
      })
      .state('combonents.cards', {
        url: '/cards',
        templateUrl: '/modules/combonents/client/views/cards.client.view.html',
        ncyBreadcrumb: {
          label: 'Cards'
        }
      })
      .state('combonents.forms', {
        url: '/forms',
        templateUrl: '/modules/combonents/client/views/forms.client.view.html',
        ncyBreadcrumb: {
          label: 'Forms'
        }
      })
      .state('combonents.switches', {
        url: '/switches',
        templateUrl: '/modules/combonents/client/views/switches.client.view.html',
        ncyBreadcrumb: {
          label: 'Switches'
        }
      })
      .state('combonents.tables', {
        url: '/tables',
        templateUrl: '/modules/combonents/client/views/tables.client.view.html',
        ncyBreadcrumb: {
          label: 'Tables'
        }
      })
      .state('combonents.login', {
        url: '/login',
        templateUrl: '/modules/combonents/client/views/login.client.view.html',
        ncyBreadcrumb: {
          label: 'Login'
        }
      })
      .state('combonents.register', {
        url: '/register',
        templateUrl: '/modules/combonents/client/views/register.client.view.html',
        ncyBreadcrumb: {
          label: 'Register'
        }
      })
      .state('combonents.404', {
        url: '/404',
        templateUrl: '/modules/combonents/client/views/404.client.view.html',
        ncyBreadcrumb: {
          label: '404'
        }
      })
      .state('combonents.500', {
        url: '/500',
        templateUrl: '/modules/combonents/client/views/500.client.view.html',
        ncyBreadcrumb: {
          label: '500'
        }
      });
  }
}());
