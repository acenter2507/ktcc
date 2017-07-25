(function () {
  'use strict';

  // Workdates controller
  angular
    .module('workdates')
    .controller('WorkdatesController', WorkdatesController);

  WorkdatesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'workdateResolve'];

  function WorkdatesController ($scope, $state, $window, Authentication, workdate) {
    var vm = this;

    vm.authentication = Authentication;
    vm.workdate = workdate;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Workdate
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.workdate.$remove($state.go('workdates.list'));
      }
    }

    // Save Workdate
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.workdateForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.workdate._id) {
        vm.workdate.$update(successCallback, errorCallback);
      } else {
        vm.workdate.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('workdates.view', {
          workdateId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());