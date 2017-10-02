(function () {
  'use strict';

  angular
    .module('users')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['$scope', '$filter', 'AdminUserService'];

  function UserListController($scope, $filter, AdminUserService) {
    var vm = this;
    vm.users = [];

  }
}());
