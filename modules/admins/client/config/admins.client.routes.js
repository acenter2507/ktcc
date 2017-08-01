(function () {
  'use strict';

  angular
    .module('admins')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admins', {
        abstract: true,
        url: '/admin',
        template: '<ui-view/>',
        ncyBreadcrumb: {
          label: 'システム管理'
        },
        data: {
          roles: ['admin']
        }
      })
      .state('admins.departments', {
        url: '/departments',
        templateUrl: '/modules/departments/client/views/list-departments.client.view.html',
        controller: 'DepartmentsListController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '部署管理'
        },
        data: {
          pageTitle: '部署一覧'
        }
      })
      .state('admins.departments.create', {
        url: '/create',
        templateUrl: '/modules/departments/client/views/form-department.client.view.html',
        controller: 'DepartmentsController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '部署作成'
        },
        resolve: {
          departmentResolve: newDepartment
        },
        data: {
          roles: ['admin'],
          pageTitle: '部署作成'
        }
      })
      .state('admins.departments.edit', {
        url: '/:departmentId/edit',
        templateUrl: '/modules/departments/client/views/form-department.client.view.html',
        controller: 'DepartmentsController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '部署編集'
        },
        resolve: {
          departmentResolve: getDepartment
        },
        data: {
          pageTitle: '部署編集'
        }
      })
      .state('admins.departments.view', {
        url: '/:departmentId',
        templateUrl: '/modules/departments/client/views/view-department.client.view.html',
        controller: 'DepartmentsController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '部署詳細'
        },
        resolve: {
          departmentResolve: getDepartment
        },
        data: {
          pageTitle: '部署詳細'
        }
      });
  }

  getDepartment.$inject = ['$stateParams', 'DepartmentsService'];

  function getDepartment($stateParams, DepartmentsService) {
    return DepartmentsService.get({
      departmentId: $stateParams.departmentId
    }).$promise;
  }

  newDepartment.$inject = ['DepartmentsService'];

  function newDepartment(DepartmentsService) {
    return new DepartmentsService();
  }
}());
