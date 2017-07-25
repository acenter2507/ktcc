(function () {
  'use strict';

  angular.module('core')
      .directive('msgCenter', msgCenter);

  /** @ngInject */
  function msgCenter() {
    return {
      restrict: 'E',
      templateUrl: '/modules/core/client/views/msg-center.client.view.html',
      controller: 'MsgCenterController'
    };
  }

})();