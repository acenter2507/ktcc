(function () {
  'use strict';

  angular
    .module('workdates')
    .controller('WorkdatesListController', WorkdatesListController);

  WorkdatesListController.$inject = ['WorkdatesService', 'Authentication'];

  function WorkdatesListController(WorkdatesService, Authentication) {
    var vm = this;
    vm.user = Authentication.user;
    vm.isLogged = (vm.user);
    vm.currentMonth = moment(new Date(), 'YYYY/MM');

    vm.daysOfMonth = [];
    function init_daysOfMonth() {}



    console.log(vm.currentMonth.startOf('month').format('LLLL'));
    console.log(vm.currentMonth.endOf('month').format('LLLL'));
    vm.workdates = WorkdatesService.query();
  }
}());
