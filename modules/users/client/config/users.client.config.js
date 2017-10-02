(function () {
  'use strict';

  angular
    .module('users')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Users',
      state: 'admin.users',
      type: 'dropdown',
      roles: ['admin', 'manage', 'vip']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'admin.users', {
      title: 'List Users',
      state: 'admin.users.list'
    });
  }
}());
