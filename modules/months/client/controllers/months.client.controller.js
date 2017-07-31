(function () {
  'use strict';

  // months controller
  angular
    .module('months')
    .controller('MonthsController', MonthsController);

  MonthsController.$inject = [
    '$scope',
    '$state',
    '$window',
    'Authentication',
    'monthResolve',
    'Notification',
    'MonthsService',
    'MonthApi',
    'MonthApi',
    'WorkdateApi',
    'SystemConfig',
    'ngDialog'
  ];

  function MonthsController($scope, $state, $window, Authentication, month, Notification, MonthsService, MonthApi, WorkdateApi, ngDialog, SystemConfig, dialog) {
    var vm = this;

    vm.month = month;
    vm.authentication = Authentication;
    vm.remove = remove;
    vm.save = save;

    vm.currentMonth = {};
    vm.daysOfMonth = [];
    vm.datas = [];
    init();
    init_daysOfMonth();
    mergeDate();
    function init() {
      vm.currentMonth = moment().year(vm.month.year).month(vm.month.month);
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
    function mergeDate() {
      for (var index = 0; index < vm.daysOfMonth.length; index++) {
        let date = vm.daysOfMonth[index];
        var hasItem = {};
        for (var subIndex = 0; subIndex < vm.month.workdates.length; subIndex++) {
          let workdate = vm.month.workdates[subIndex];
          if (date.date() === parseInt(workdate.date, 10)) {
            hasItem = workdate;
            break;
          }
        }
        vm.datas.push({ date: date, data: hasItem });
      }
    }

    vm.lastMonth = () => {
      var lastMonth = vm.currentMonth.clone().subtract(1, 'months').month();
      MonthApi.get_month_by_month(lastMonth)
        .then(res => {
          if (res.data && res.data._id) {
            $state.go('months.view', { monthId: res.data._id });
          } else {
            $scope.message_title = '確認！';
            $scope.message_content = (lastMonth + 1) + '月の勤務表を存在していません。すぐ作成しますか？';
            $scope.dialog_type = 1;
            $scope.buton_label = '作成';
            dialog.openConfirm({
              scope: $scope,
              templateUrl: '/modules/core/client/views/templates/confirm.dialog.template.html'
            }).then(confirm => {
              handle_create();
            });
            function handle_create() {
              var rs_month = new MonthsService({ year: vm.currentMonth.format('YYYY'), month: lastMonth + '' });
              rs_month.$save(res => {
                $state.go('months.view', { monthId: res._id });
              });
            }
          }
        })
        .catch(err => {
          Notification.error({ message: '先月の勤務表を取れませんでした！', delay: 6000 });
        });
    };
    vm.nextMonth = () => {
      var nextMonth = vm.currentMonth.clone().add(1, 'months').month();
      MonthApi.get_month_by_month(nextMonth)
        .then(res => {
          if (res.data && res.data._id) {
            $state.go('months.view', { monthId: res.data._id });
          } else {
            $scope.message_title = '確認！';
            $scope.message_content = (nextMonth + 1) + '月の勤務表を存在していません。すぐ作成しますか？';
            $scope.dialog_type = 1;
            $scope.buton_label = '作成';
            dialog.openConfirm({
              scope: $scope,
              templateUrl: '/modules/core/client/views/templates/confirm.dialog.template.html'
            }).then(confirm => {
              handle_create();
            });
            function handle_create() {
              var rs_month = new MonthsService({ year: vm.currentMonth.format('YYYY'), month: nextMonth + '' });
              rs_month.$save(res => {
                $state.go('months.view', { monthId: res._id });
              });
            }
          }
        })
        .catch(err => {
          Notification.error({ message: '来月の勤務表を取れませんでした！', delay: 6000 });
        });
    };

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
