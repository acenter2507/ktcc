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
    vm.currentMonth = moment(new Date()).format('YYYY[年]MMMM');
    console.log(vm.currentMonth);
    console.log(typeof vm.currentMonth);
    vm.workdates = WorkdatesService.query();
  }
}());
