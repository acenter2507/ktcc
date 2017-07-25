(function () {
  'use strict';

  angular
    .module('workdates')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Templates',
      state: 'templates',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'templates', {
      title: 'Buttons',
      state: 'templates.buttons'
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'templates', {
      title: 'Social buttons',
      state: 'templates.social-buttons'
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'templates', {
      title: 'Cards',
      state: 'templates.cards'
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'templates', {
      title: 'Forms',
      state: 'templates.forms'
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'templates', {
      title: 'Tables',
      state: 'templates.tables'
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'templates', {
      title: 'Register',
      state: 'templates.register'
    });
  }
}());
