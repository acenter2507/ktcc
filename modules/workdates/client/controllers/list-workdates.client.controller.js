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

    vm.startDate = moment(vm.currentMonth).subtract(1, 'months').date(21);
    vm.endDate = moment(vm.currentMonth).date(20);

    vm.daysOfMonth = [];
    function init_daysOfMonth() { }


    console.log(vm.startDate.format('LLLL'));
    console.log(vm.endDate.format('LLLL'));
    console.log(vm.currentMonth.startOf('month').format('LLLL'));
    console.log(vm.currentMonth.endOf('month').format('LLLL'));
    vm.workdates = WorkdatesService.query();
  }
}());
