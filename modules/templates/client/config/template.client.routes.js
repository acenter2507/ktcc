(function () {
  'use strict';

  angular
    .module('templates')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('templates', {
        abstract: true,
        url: '/templates',
        ncyBreadcrumb: {
          label: 'Templates'
        },
        template: '<ui-view></ui-view>'
      })
      .state('templates.buttons', {
        url: '/buttons',
        templateUrl: 'modules/templates/client/views/buttons.client.view.html',
        ncyBreadcrumb: {
          label: 'Buttons'
        }
      })
      .state('templates.social-buttons', {
        url: '/social-buttons',
        templateUrl: 'modules/templates/client/views/social-buttons.client.view.html',
        ncyBreadcrumb: {
          label: 'Social Buttons'
        }
      })
      .state('templates.cards', {
        url: '/cards',
        templateUrl: 'modules/templates/client/views/cards.client.view.html',
        ncyBreadcrumb: {
          label: 'Cards'
        }
      })
      .state('templates.forms', {
        url: '/forms',
        templateUrl: 'modules/templates/client/views/forms.client.view.html',
        ncyBreadcrumb: {
          label: 'Forms'
        }
      })
      .state('templates.switches', {
        url: '/switches',
        templateUrl: 'modules/templates/client/views/switches.client.view.html',
        ncyBreadcrumb: {
          label: 'Switches'
        }
      })
      .state('templates.tables', {
        url: '/tables',
        templateUrl: 'modules/templates/client/views/tables.client.view.html',
        ncyBreadcrumb: {
          label: 'Tables'
        }
      })
      .state('templates.login', {
        url: '/login',
        templateUrl: 'modules/templates/client/views/login.client.view.html',
        ncyBreadcrumb: {
          label: 'Login'
        }
      })
      .state('templates.register', {
        url: '/register',
        templateUrl: 'modules/templates/client/views/register.client.view.html',
        ncyBreadcrumb: {
          label: 'Register'
        }
      })
      .state('templates.404', {
        url: '/404',
        templateUrl: 'modules/templates/client/views/404.client.view.html',
        ncyBreadcrumb: {
          label: '404'
        }
      })
      .state('templates.500', {
        url: '/500',
        templateUrl: 'modules/templates/client/views/500.client.view.html',
        ncyBreadcrumb: {
          label: '500'
        }
      });
  }
}());
