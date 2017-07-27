(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$rootScope', '$scope', '$state', 'Authentication', 'menuService'];

  function HeaderController($rootScope, $scope, $state, Authentication, menuService) {
    var vm = this;
    vm.user = Authentication.user;
    vm.isLogged = (vm.user);

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }
    $rootScope.$on('loginSuccess', () => {
      console.log(Authentication.user);
    });
  }
}());
