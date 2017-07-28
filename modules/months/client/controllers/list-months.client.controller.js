(function () {
  'use strict';

  angular
    .module('months')
    .controller('MonthsListController', MonthsListController);

  MonthsListController.$inject = ['$scope', '$state', 'MonthsService', 'Authentication', '$stateParams', 'MonthApi', 'Notification', 'ngDialog'];

  function MonthsListController($scope, $state, MonthsService, Authentication, $stateParams, MonthApi, Notification, dialog) {
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
          Notification.error({ message: err.message, title: '<i class="glyphicon glyphicon-remove"></i> エラー!', delay: 6000 });
        });
    }

    function mergeData() {
      for (var index = 0; index < vm.monthsOfYear.length; index++) {
        let monthNumber = vm.monthsOfYear[index] + 1;
        var hasItem = {};
        for (var subIndex = 0; subIndex < vm.months.length; subIndex++) {
          let month = parseInt(vm.months[subIndex].month, 10);
          if (monthNumber === month) {
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
    // Create mount
    vm.createMonth = month => {
      var rs_month = new MonthsService({ year: vm.currentYear.format('YYYY'), month: month + '' });
      rs_month.$save(res => {
        $state.go('months.view', { monthId: res._id });
      });
    };
    // Send month to manager
    vm.sendMonth = item => {
      $scope.message_title = '確認！';
      $scope.message_content = item.data.year + '年' + (item.month + 1) + '月の勤務表をマネージャに送信しますか？';
      $scope.dialog_type = 2;
      $scope.buton_label = '送信';
      dialog.openConfirm({
        scope: $scope,
        templateUrl: '/modules/core/client/views/templates/confirm.dialog.template.html'
      }).then(confirm => {
        handle_delete();
      }, reject => {
      });
      function handle_delete() {
        var rs_month = new MonthsService(item.data);
        rs_month.status = 2;
        rs_month.$save(() => {
          Notification.info({ message: '勤務表を送信済み！', delay: 5000 });
        });
      }
    };
    // Send month to manager
    vm.sendOneMore = item => {
      $scope.message_title = '確認！';
      $scope.message_content = item.data.year + '年' + (item.month + 1) + '月の勤務表をマネージャに再度送信しますか？';
      $scope.dialog_type = 2;
      $scope.buton_label = '送信';
      dialog.openConfirm({
        scope: $scope,
        templateUrl: '/modules/core/client/views/templates/confirm.dialog.template.html'
      }).then(confirm => {
        handle_delete();
      }, reject => {
      });
      function handle_delete() {
        var rs_month = new MonthsService(item.data);
        rs_month.status = 2;
        rs_month.$save(() => {
          Notification.info({ message: '勤務表を送信済み！', delay: 5000 });
        });
      }
    };
    // Send
    vm.viewMonth = month => {
      $state.go('months.view', { monthId: month._id });
    };
  }
}());
