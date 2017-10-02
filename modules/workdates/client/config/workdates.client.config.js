(function () {
  'use strict';

  angular
    .module('workdates')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Workdates',
      state: 'workdates',
      type: 'dropdown',
      roles: ['user']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'workdates', {
      title: 'List Workdates',
      state: 'workdates.list'
    });

    // Add the dropdown create item
    menuService.addSubMenuItem('topbar', 'workdates', {
      title: 'Create Workdate',
      state: 'workdates.create'
    });
  }
}());
