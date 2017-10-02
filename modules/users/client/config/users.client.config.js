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
      state: 'users',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'users', {
      title: 'List Users',
      state: 'months.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'users', {
      title: 'Create User',
      state: 'months.create'
    });
  }
}());
