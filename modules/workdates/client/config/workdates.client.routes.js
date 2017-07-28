(function () {
  'use strict';

  angular
    .module('workdates')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('workdates', {
        abstract: true,
        url: '/workdates',
        template: '<ui-view/>',
        ncyBreadcrumb: {
          label: '勤務時間'
        },
        data: {
          roles: ['admin', 'user']
        }
      })
      .state('workdates.list', {
        url: '',
        templateUrl: '/modules/workdates/client/views/list-workdates.client.view.html',
        controller: 'WorkdatesListController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '一覧'
        },
        data: {
          roles: ['admin', 'user'],
          pageTitle: '勤務時間一覧'
        }
      })
      .state('workdates.month', {
        url: '/list?mounth',
        templateUrl: '/modules/workdates/client/views/month-workdates.client.view.html',
        controller: 'MonthWorkdatesController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '勤務表'
        },
        data: {
          roles: ['admin', 'user'],
          pageTitle: '勤務表'
        }
      })
      .state('workdates.create', {
        url: '/create',
        templateUrl: '/modules/workdates/client/views/form-workdate.client.view.html',
        controller: 'WorkdatesController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '登録'
        },
        resolve: {
          workdateResolve: newWorkdate
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: '勤務時間登録'
        }
      })
      .state('workdates.edit', {
        url: '/:workdateId/edit',
        templateUrl: '/modules/workdates/client/views/form-workdate.client.view.html',
        controller: 'WorkdatesController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '編集'
        },
        resolve: {
          workdateResolve: getWorkdate
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: '勤務時間編集'
        }
      })
      .state('workdates.view', {
        url: '/:workdateId',
        templateUrl: '/modules/workdates/client/views/view-workdate.client.view.html',
        controller: 'WorkdatesController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '詳細'
        },
        resolve: {
          workdateResolve: getWorkdate
        },
        data: {
          roles: ['admin', 'user'],
          pageTitle: '勤務時間詳細'
        }
      });
  }

  getWorkdate.$inject = ['$stateParams', 'WorkdatesService'];

  function getWorkdate($stateParams, WorkdatesService) {
    return WorkdatesService.get({
      workdateId: $stateParams.workdateId
    }).$promise;
  }

  newWorkdate.$inject = ['WorkdatesService'];

  function newWorkdate(WorkdatesService) {
    return new WorkdatesService();
  }
}());
