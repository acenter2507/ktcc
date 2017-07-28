(function () {
  'use strict';

  // months controller
  angular
    .module('months')
    .controller('MonthsController', MonthsController);

  MonthsController.$inject = ['$scope', '$state', '$window', 'Authentication', 'MonthResolve', 'Notification'];

  function MonthsController ($scope, $state, $window, Authentication, Month, Notification) {
    var vm = this;

    vm.month = month;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

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
