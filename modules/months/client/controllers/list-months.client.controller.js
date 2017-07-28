(function () {
  'use strict';

  angular
    .module('months')
    .controller('MonthsListController', MonthsListController);

  MonthsListController.$inject = ['$state', 'MonthsService', 'Authentication', '$stateParams', 'MonthApi', 'Notification'];

  function MonthsListController($state, MonthsService, Authentication, $stateParams, MonthApi, Notification) {
    var vm = this;
    vm.user = Authentication.user;
    vm.isLogged = (vm.user);

    vm.currentYear = null;
    vm.monthsOfYear = [];
    vm.months = [];
    vm.datas = [];
    initParams();
    init_monthsOfYear();
    init_Months();

    function initParams() {
      var param = $stateParams.year;
      if (param) {
        vm.currentYear = moment(param, 'YYYY');
      } else {
        vm.currentYear = moment(new Date(), 'YYYY');
      }
    }

    function init_monthsOfYear() {
      vm.startMonth = vm.currentYear.clone().startOf('year');
      vm.endMonth = vm.currentYear.clone().endOf('year').subtract(1, 'days');
      var durration = vm.endMonth.diff(vm.startMonth, 'months', true);
      for (var index = 0; index <= durration; index++) {
        var item = vm.startMonth.clone().add(index, 'months').month();
        vm.monthsOfYear.push(item);
      }
    }

    function init_Months() {
      MonthApi.get_months_by_year(vm.currentYear.format('YYYY'))
        .then(res => {
          vm.months = res.data || [];
          mergeData();
        })
        .catch(err => {
          Notification.error({ message: err.message, title: '<i class="glyphicon glyphicon-remove"></i> Error!', delay: 6000 });
        });
    }

    function mergeData() {
      vm.months.forEach(function (month) {
        month.time = moment(month.time).tz('Asia/Tokyo');
      });
      for (var index = 0; index < vm.monthsOfYear.length; index++) {
        let monthNumber = vm.monthsOfYear[index];
        var hasItem = {};
        for (var subIndex = 0; subIndex < vm.months.length; subIndex++) {
          let month = vm.months[subIndex].time;
          if (month.month() === monthNumber) {
            hasItem = vm.months[subIndex];
            break;
          }
        }
        vm.datas.push({ month: monthNumber, data: hasItem });
      }
    }

    vm.lastYear = () => {
      var lastYear = vm.currentYear.subtract(1, 'years');
      $state.go('months.list', {
        year: lastYear.format('YYYY')
      });
    };
    vm.nextYear = () => {
      var nextYear = vm.currentYear.add(1, 'years');
      $state.go('months.list', {
        year: nextYear.format('YYYY')
      });
    };
    vm.createMonth = month => {
      var time = moment().utc().year(vm.currentYear.format('YYYY')).month(month).startOf('month');
      var rs_month = new MonthsService({ time: time, year: vm.currentYear.format('YYYY') });
      rs_month.$save(res => {
        console.log(res);
      });
    };
  }
}());
