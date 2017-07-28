(function () {
  'use strict';

  angular
    .module('core')
    .factory('SystemConfig', systemConfig);

  function systemConfig() {
    this.startDayOfMonth = 20;
    return this;
  }
}());
