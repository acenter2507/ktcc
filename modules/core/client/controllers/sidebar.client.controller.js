(function () {
  'use strict';

  angular
    .module('core')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$scope', '$state', 'Authentication', 'menuService'];

  function SidebarController($scope, $state, Authentication, menuService) {
    var vm = this;
    vm.user = Authentication.user;
    vm.isLogged = (vm.user);
  }
}());
