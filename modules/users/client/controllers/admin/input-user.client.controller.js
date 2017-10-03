(function () {
  'use strict';

  angular
    .module('users')
    .controller('UserInputController', UserInputController);

  UserInputController.$inject = ['$scope', 'userResolve', 'AdminUserService', 'DepartmentsService'];

  function UserInputController($scope, userResolve, AdminUserService, DepartmentsService) {
    var vm = this;
    vm.departments = DepartmentsService.query();
    vm.user = userResolve;
    vm.form = {};
    onCreate();

    function onCreate() {
      if (vm.user._id) {
        vm.user.department = vm.user.department._id || vm.user.department;
      }
      vm.dateOptions = {
        dateDisabled: disabled,
        maxDate: new Date(),
        minDate: new Date(1900, 1, 1),
        startingDay: 1
      };
      vm.openDatePicker = false;
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
