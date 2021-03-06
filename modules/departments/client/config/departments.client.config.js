(function () {
  'use strict';

  angular
    .module('departments')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Departments',
      state: 'departments',
      type: 'dropdown',
      roles: ['admin', 'manage', 'vip']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'departments', {
      title: 'List Departments',
      state: 'departments.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'departments', {
      title: 'Create Departments',
      state: 'departments.create'
    });
  }
}());
