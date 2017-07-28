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
    vm.currentMonth = moment(new Date(), 'YYYY/MM').month(2);

    vm.startDate = moment(vm.currentMonth).subtract(1, 'months').date(21);
    vm.endDate = moment(vm.currentMonth).date(20);

    vm.daysOfMonth = [];
    init_daysOfMonth();
    function init_daysOfMonth() {
      var startDate = vm.startDate.clone().startOf('day');
      var lastDate = vm.endDate.clone().startOf('day');

      vm.daysOfMonth.push(startDate.clone().toDate());
      while (startDate.add(1, 'days').diff(lastDate) < 0) {
        console.log(startDate.toDate());
        console.log(typeof startDate.toDate());
        vm.daysOfMonth.push(startDate.clone().toDate());
      }
      vm.daysOfMonth.push(lastDate.clone().toDate());
    }


    // console.log(vm.startDate.format('LLLL'));
    // console.log(vm.endDate.format('LLLL'));
    // console.log(vm.currentMonth.startOf('month').format('LLLL'));
    // console.log(vm.currentMonth.endOf('month').format('LLLL'));
    vm.workdates = WorkdatesService.query();
  }
}());
