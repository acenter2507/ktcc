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
        dateDisabled: false,
        maxDate: new Date(),
        minDate: new Date(1900, 1, 1),
        startingDay: 1
      };
      vm.openDatePicker = false;
    }
  }
}());
