(function () {
  'use strict';

  angular
    .module('users')
    .controller('UserListController', UserListController);

  UserListController.$inject = ['$scope', '$filter', 'AdminUserService', 'AdminUserApi', 'DepartmentsService'];

  function UserListController($scope, $filter, AdminUserService, AdminUserApi, DepartmentsService) {
    var vm = this;
    vm.departments = DepartmentsService.query();
    vm.users = [];
    vm.condition = {};
    vm.page = 1;
    console.log($scope.user);
    onCreate();

    function onCreate() {
      handleLoadUsers();
    }

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
    vm.handleSearch = () => {
      vm.page = 1;
      handleLoadUsers();
    };
    vm.handleClearCondition = () => {
      vm.condition = {};
      vm.page = 1;
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
