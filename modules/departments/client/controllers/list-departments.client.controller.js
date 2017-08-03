(function () {
  'use strict';

  angular
    .module('departments')
    .controller('DepartmentsListController', DepartmentsListController);

  DepartmentsListController.$inject = ['$scope', 'DepartmentsService', 'ngDialog'];

  function DepartmentsListController($scope, DepartmentsService, dialog) {
    var vm = this;

    vm.departments = DepartmentsService.query();
    vm.remove = department => {
      $scope.message_title = '確認！';
      $scope.message_content = department.name + 'を削除しますか？';
      $scope.dialog_type = 3;
      $scope.buton_label = '削除';
      dialog.openConfirm({
        scope: $scope,
        templateUrl: '/modules/core/client/views/templates/confirm.dialog.template.html'
      }).then(confirm => {
        handle_delete();
      }, reject => {
      });
      function handle_delete() {
        vm.departments = _.without(vm.departments, department);
        department.$remove();
      }
    };
  }
}());
