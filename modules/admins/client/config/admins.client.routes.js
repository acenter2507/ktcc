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
          label: '部門管理'
        },
        data: {
          pageTitle: '部門一覧'
        }
      })
      .state('admins.departments.edit', {
        url: '/departments/:departmentId/edit',
        templateUrl: '/modules/departments/client/views/form-department.client.view.html',
        controller: 'DepartmentsController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '部門編集'
        },
        resolve: {
          departmentResolve: getDepartment
        },
        data: {
          pageTitle: '部門編集'
        }
      })
      .state('admins.departments.view', {
        url: '/departments/:departmentId',
        templateUrl: '/modules/departments/client/views/view-department.client.view.html',
        controller: 'DepartmentsController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '部門詳細'
        },
        resolve: {
          departmentResolve: getDepartment
        },
        data: {
          pageTitle: '部門詳細'
        }
      })
      .state('departments.create', {
        url: '/departments/create',
        templateUrl: '/modules/departments/client/views/form-department.client.view.html',
        controller: 'DepartmentsController',
        controllerAs: 'vm',
        ncyBreadcrumb: {
          label: '部門作成'
        },
        resolve: {
          departmentResolve: newDepartment
        },
        data: {
          roles: ['admin'],
          pageTitle: '部門作成'
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
