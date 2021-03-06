(function () {
  'use strict';

  // Workdates controller
  angular
    .module('workdates')
    .controller('WorkdatesController', WorkdatesController);

  WorkdatesController.$inject = ['$scope', '$state', '$window', 'Authentication', 'workdateResolve', 'Notification'];

  function WorkdatesController ($scope, $state, $window, Authentication, workdate, Notification) {
    var vm = this;
    vm.user = Authentication.user;

    vm.workdate = workdate;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    vm.currentDate = {};
    init();
    function init() {
      vm.currentDate = moment().year(vm.workdate.year).month(vm.workdate.month).date(vm.workdate.date);
    }

    vm.start_changed = () => {
      console.log($scope.start);
    };
    vm.end_changed = () => {
      console.log($scope.end);
    };
    // Remove existing Workdate
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.workdate.$remove(() => {
          $state.go('workdates.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Workdate deleted successfully!' });
        });
      }
    }

    // Save Workdate
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.workdateForm');
        return false;
      }
      vm.workdate.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('workdates.view', {
          workdateId: res._id
        });
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Workdate saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Workdate save error!' });
      }
    }
  }
}());
