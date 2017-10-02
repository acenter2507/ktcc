(function () {
  'use strict';

  angular
    .module('users')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['$scope', '$filter', 'AdminUserService', 'AdminUserApi'];

  function UserListController($scope, $filter, AdminUserService, AdminUserApi) {
    var vm = this;
    vm.users = [];
    vm.condition = {};
    vm.page = 1;
    onCreate();

    function handleLoadUsers() {
      AdminUserApi.loadAdminUsers(vm.condition, vm.page)
        .success(res => {
          vm.users = res.docs;
          vm.totalPage = createArrayFromRange(res.pages);
          vm.totalUser = res.total;
        })
        .error(err => {
          alert(err.message);
        });
    }

    vm.handleChangePage = page => {
      vm.page = page;
      handleLoadUsers();
    };

    function createArrayFromRange(range) {
      var array = [];
      for (var i = 1; i <= range; i++) {
        array.push(i);
      }
      return array;
    }
  }
}());
