(function () {
  'use strict';

  angular
    .module('months')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('months', {
        abstract: true,
        url: '/months',
        template: '<ui-view/>',
        ncyBreadcrumb: {
          label: '勤務管理'
        },
        data: {
          roles: ['admin', 'user']
        }
      })
      .state('months.list', {
        url: '?year',
        templateUrl: '/modules/months/client/views/list-months.client.view.html',
        controller: 'MonthsListController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '一覧'
        },
        data: {
          roles: ['admin', 'user'],
          pageTitle: '勤務時間一覧'
        }
      })
      .state('months.create', {
        url: '/create',
        templateUrl: '/modules/months/client/views/form-month.client.view.html',
        controller: 'MonthsController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '登録'
        },
        resolve: {
          monthResolve: newMonth
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: '勤務時間登録'
        }
      })
      .state('months.edit', {
        url: '/:monthId/edit',
        templateUrl: '/modules/months/client/views/form-month.client.view.html',
        controller: 'MonthsController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '編集'
        },
        resolve: {
          monthResolve: getMonth
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: '勤務時間編集'
        }
      })
      .state('months.view', {
        url: '/:monthId',
        templateUrl: '/modules/months/client/views/view-month.client.view.html',
        controller: 'MonthsController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '勤務表'
        },
        resolve: {
          monthResolve: getMonth
        },
        data: {
          roles: ['admin', 'user'],
          pageTitle: '勤務表'
        }
      });
  }

  getMonth.$inject = ['$stateParams', 'MonthsService'];

  function getMonth($stateParams, MonthsService) {
    return MonthsService.get({
      monthId: $stateParams.monthId
    }).$promise;
  }

  newMonth.$inject = ['MonthsService'];

  function newMonth(MonthsService) {
    return new MonthsService();
  }
}());
