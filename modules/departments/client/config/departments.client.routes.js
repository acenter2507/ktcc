(function () {
  'use strict';

  angular
    .module('departments')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('departments', {
        abstract: true,
        url: '/departments',
        template: '<ui-view/>',
        ncyBreadcrumb: {
          label: '部署管理'
        }
      })
      .state('departments.list', {
        url: '',
        templateUrl: '/modules/departments/client/views/list-departments.client.view.html',
        controller: 'DepartmentsListController',
        controllerAs: 'vm',
        data: {
          pageTitle: '部署一覧'
        },
        ncyBreadcrumb: {
          label: '部署一覧'
        }
      })
      .state('departments.create', {
        url: '/create',
        templateUrl: '/modules/departments/client/views/form-department.client.view.html',
        controller: 'DepartmentsController',
        controllerAs: 'vm',
        resolve: {
          departmentResolve: newDepartment
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: '部署追加'
        },
        ncyBreadcrumb: {
          label: '追加'
        }
      })
      .state('departments.edit', {
        url: '/:departmentId/edit',
        templateUrl: '/modules/departments/client/views/form-department.client.view.html',
        controller: 'DepartmentsController',
        controllerAs: 'vm',
        resolve: {
          departmentResolve: getDepartment
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: '編集 {{ departmentResolve.name }}'
        },
        ncyBreadcrumb: {
          label: '編集'
        }
      })
      .state('departments.view', {
        url: '/:departmentId',
        templateUrl: '/modules/departments/client/views/view-department.client.view.html',
        controller: 'DepartmentsController',
        controllerAs: 'vm',
        resolve: {
          departmentResolve: getDepartment
        },
        data: {
          pageTitle: '詳細 {{ departmentResolve.name }}'
        },
        ncyBreadcrumb: {
          label: '詳細'
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
