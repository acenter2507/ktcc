(function () {
  'use strict';

  angular
    .module('users')
    .filter('RoleFilter', RoleFilter);

  RoleFilter.$inject = [];

  function RoleFilter() {
    return function (roles) {
      if (_.contains(roles, 'vip')) return 'システム管理';
      if (_.contains(roles, 'admin')) return '経理部';
      if (_.contains(roles, 'manage')) return 'マネージャ';
      return '社員';
    };
  }
}());
