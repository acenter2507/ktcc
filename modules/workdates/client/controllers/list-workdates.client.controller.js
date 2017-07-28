(function () {
  'use strict';

  angular
    .module('workdates')
    .controller('WorkdatesListController', WorkdatesListController);

  WorkdatesListController.$inject = ['WorkdatesService', 'Authentication', '$window'];

  function WorkdatesListController(WorkdatesService, Authentication, $window) {
    var vm = this;
    vm.user = Authentication.user;
    vm.isLogged = (vm.user);
    vm.currentMonth = moment(new Date(), 'YYYY/MM');
    if (vm.currentMonth.date() > 20) {
      vm.currentMonth.add(1, 'months');
    }

    vm.startDate = moment(vm.currentMonth).subtract(1, 'months').date(21);
    vm.endDate = moment(vm.currentMonth).date(20);

    vm.daysOfMonth = [];
    init_daysOfMonth();
    function init_daysOfMonth() {
      var durration = vm.endDate.diff(vm.startDate, 'days');
      // console.log(durration);
      for (var index = 0; index <= durration; index++) {
        var item = vm.startDate.clone().add(index, 'days');
        vm.daysOfMonth.push(item);
      }
    }
    vm.isWeeken = isWeeken;
    function isWeeken(date) {
      return date.day() > 5;
    }
    // console.log(vm.startDate.format('LLLL'));
    // console.log(vm.endDate.format('LLLL'));
    // console.log(vm.currentMonth.startOf('month').format('LLLL'));
    // console.log(vm.currentMonth.endOf('month').format('LLLL'));
    vm.workdates = WorkdatesService.query();
  }
}());
