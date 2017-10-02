(function () {
  'use strict';

  angular
    .module('core')
    .controller('AppController', AppController);

  AppController.$inject = ['$scope', '$state', 'Authentication', 'Notifications'];

  function AppController($scope, $state, Authentication, Notifications) {
    $scope.Authentication = Authentication;
    $scope.Notifications = Notifications;

    preapareScopeListener();
    function onCreate() {
      $scope.user = Authentication.user;
      $scope.isLogged = ($scope.user);
      $scope.isAdmin = $scope.isLogged && _.contains($scope.user.roles, 'admin');
      $scope.isManager = $scope.isLogged && _.contains($scope.user.roles, 'manage');
      $scope.isVip = $scope.isLogged && _.contains($scope.user.roles, 'vip');
    }

    function preapareScopeListener() {
      $scope.$watch('Authentication.user', () => {
        onCreate();
      });
    }
  }
}());
