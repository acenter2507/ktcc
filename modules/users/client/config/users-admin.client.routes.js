(function () {
  'use strict';

  // Setting up route
  angular
    .module('users')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('users', {
        url: '/users',
        abstract: true,
        template: '<ui-view></ui-view>'
      })
      .state('users.list', {
        url: '/list',
        templateUrl: '/modules/users/client/views/admin/list-users.client.view.html',
        controller: 'UserListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Users List'
        }
      })
      .state('users.view', {
        url: '/:userId',
        templateUrl: '/modules/users/client/views/admin/view-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit {{ userResolve.displayName }}'
        }
      })
      .state('users.edit', {
        url: '/:userId/edit',
        templateUrl: '/modules/users/client/views/admin/edit-user.client.view.html',
        controller: 'UserController',
        controllerAs: 'vm',
        resolve: {
          userResolve: getUser
        },
        data: {
          pageTitle: 'Edit User {{ userResolve.displayName }}'
        }
      })
      .state('users.new', {
        url: '/new',
        templateUrl: '/modules/users/client/views/admin/input-user.client.view.html',
        controller: 'UserInputController',
        controllerAs: 'vm',
        resolve: {
          userResolve: newUser
        },
        data: {
          pageTitle: 'New User'
        }
      });

    getUser.$inject = ['$stateParams', 'AdminUserService'];

    function getUser($stateParams, AdminUserService) {
      return AdminUserService.get({
        userId: $stateParams.userId
      }).$promise;
    }
    newUser.$inject = ['AdminUserService'];

    function newUser(AdminUserService) {
      return new AdminUserService();
    }
  }
}());
