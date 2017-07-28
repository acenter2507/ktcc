(function () {
  'use strict';

  angular
    .module('workdates')
    .controller('MonthWorkdatesController', MonthWorkdatesController);

  MonthWorkdatesController.$inject = ['$stateParams', '$state', 'WorkdatesService', 'Authentication', 'SystemConfig', 'WorkdateApi'];

  function MonthWorkdatesController($stateParams, $state, WorkdatesService, Authentication, SystemConfig, WorkdateApi) {
    var vm = this;
    vm.user = Authentication.user;
    vm.isLogged = (vm.user);

    vm.currentMonth = {};
    vm.daysOfMonth = [];
    initParams();
    init_daysOfMonth();

    function initParams() {
      var param = $stateParams.month;
      if (param) {
        vm.currentMonth = moment(param, 'YYYY/MM');
      } else {
        vm.currentMonth = moment(new Date(), 'YYYY/MM');
        if (vm.currentMonth.date() > 20) {
          vm.currentMonth.add(1, 'months');
        }
      }
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
    function init_Workdates() {
      WorkdateApi.get_workdates_by_month(vm.currentMonth.format());
    }
    // console.log(vm.startDate.format('LLLL'));
    // console.log(vm.endDate.format('LLLL'));
    // console.log(vm.currentMonth.startOf('month').format('LLLL'));
    // console.log(vm.currentMonth.endOf('month').format('LLLL'));
    vm.workdates = WorkdatesService.query();


    vm.lastMonth = () => {
      var lastMonth = vm.currentMonth.subtract(1, 'months');
      $state.go('workdates.month', {
        month: lastMonth.format('YYYY/MM')
      });
    };
    vm.nextMonth = () => {
      var nextMonth = vm.currentMonth.add(1, 'months');
      $state.go('workdates.month', {
        month: nextMonth.format('YYYY/MM')
      });
    };
  }
}());
