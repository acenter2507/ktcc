(function () {
  'use strict';

  angular
    .module('core')
    .controller('SidebarController', SidebarController);

  SidebarController.$inject = ['$rootScope', '$scope', '$state', 'Authentication', 'menuService'];

  function SidebarController($rootScope, $scope, $state, Authentication, menuService) {
    var vm = this;
    init();
    function init() {
      vm.user = Authentication.user;
      vm.isLogged = (vm.user);
    }
    $rootScope.$on('loginSuccess', () => {
      init();
    });
  }
}());
