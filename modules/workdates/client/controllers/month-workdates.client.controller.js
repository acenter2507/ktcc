(function () {
  'use strict';

  angular
    .module('workdates')
    .controller('MonthWorkdatesController', MonthWorkdatesController);

  MonthWorkdatesController.$inject = ['$stateParams', '$state', 'WorkdatesService', 'Authentication', 'SystemConfig'];

  function MonthWorkdatesController($stateParams, $state, WorkdatesService, Authentication, SystemConfig) {
    var vm = this;
    vm.user = Authentication.user;
    vm.isLogged = (vm.user);
    vm.currentMonth = ($stateParams.mount) ? moment($stateParams.mount, 'YYYY/MM') : moment(new Date(), 'YYYY/MM');
    console.log(vm.currentMonth);
    // vm.currentMonth = moment(new Date(), 'YYYY/MM');
    // if (vm.currentMonth.date() > 20) {
    //   vm.currentMonth.add(1, 'months');
    // }

    vm.startDate = moment(vm.currentMonth).subtract(1, 'months').date(SystemConfig.startDayOfMonth + 1);
    vm.endDate = moment(vm.currentMonth).date(SystemConfig.startDayOfMonth);

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

    // console.log(vm.startDate.format('LLLL'));
    // console.log(vm.endDate.format('LLLL'));
    // console.log(vm.currentMonth.startOf('month').format('LLLL'));
    // console.log(vm.currentMonth.endOf('month').format('LLLL'));
    vm.workdates = WorkdatesService.query();


    vm.lastMonth = () => {
      var lastMonth = vm.currentMonth.subtract(1, 'months');
      $state.go({
        month: lastMonth.formart('YYYY/MM')
      });
    }
    vm.nextMonth = () => {
      var nextMonth = vm.currentMonth.add(1, 'months');
      $state.go({
        month: nextMonth.formart('YYYY/MM')
      });
    }
  }
}());
