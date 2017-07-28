(function () {
  'use strict';

  // months controller
  angular
    .module('months')
    .controller('MonthsController', MonthsController);

  MonthsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'MonthResolve', 'Notification', 'MonthsService', 'MonthApi', 'ngDialog', 'SystemConfig'];

  function MonthsController ($scope, $state, $window, Authentication, month, Notification, MonthsService, MonthApi, ngDialog, SystemConfig) {
    var vm = this;

    vm.month = month;
    vm.authentication = Authentication;
    vm.remove = remove;
    vm.save = save;

    vm.currentMonth = {};
    vm.daysOfMonth = [];
    init();
    init_daysOfMonth();
    function init() {
      vm.currentMonth = moment(vm.month.time, 'YYYY/MM');
      console.log(vm.currentMonth);
    }
    function init_daysOfMonth() {
      vm.startDate = moment(vm.currentMonth).subtract(1, 'months').date(SystemConfig.startDayOfMonth + 1);
      vm.endDate = moment(vm.currentMonth).date(SystemConfig.startDayOfMonth);
      var durration = vm.endDate.diff(vm.startDate, 'days');
      for (var index = 0; index <= durration; index++) {
        var item = vm.startDate.clone().add(index, 'days');
        vm.daysOfMonth.push(item);
      }
    }
    // Remove existing month
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.month.$remove(() => {
          $state.go('months.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Month deleted successfully!' });
        });
      }
    }

    // Save month
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.monthForm');
        return false;
      }
      vm.month.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('months.view', {
          monthId: res._id
        });
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Month saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Month save error!' });
      }
    }
  }
}());
