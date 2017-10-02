(function () {
  'use strict';

  // TODO this should be Users service
  angular
    .module('users')
    .factory('AdminUserApi', AdminUserApi);

  AdminUserApi.$inject = ['$http'];

  function AdminUserApi($http) {
    this.loadAdminUsers = (condition, page) => {
      return $http.post('/api/admins/users', { condition: condition, page: page }, { ignoreLoadingBar: true });
    };
    return this;
  }
}());