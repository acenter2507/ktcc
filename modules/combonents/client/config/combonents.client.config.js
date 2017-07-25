(function () {
  'use strict';

  angular
    .module('combonents')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    // Set top bar menu items
    menuService.addMenuItem('topbar', {
      title: 'Combonents',
      state: 'combonents',
      type: 'dropdown',
      roles: ['*']
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'combonents', {
      title: 'Buttons',
      state: 'combonents.buttons'
    });

    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'combonents', {
      title: 'Social buttons',
      state: 'combonents.social'
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'combonents', {
      title: 'Cards',
      state: 'combonents.cards'
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'combonents', {
      title: 'Forms',
      state: 'combonents.forms'
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'combonents', {
      title: 'Tables',
      state: 'combonents.tables'
    });
    // Add the dropdown list item
    menuService.addSubMenuItem('topbar', 'combonents', {
      title: 'Register',
      state: 'combonents.register'
    });
  }
}());
