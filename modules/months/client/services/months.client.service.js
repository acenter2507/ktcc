// months service used to communicate months REST endpoints
(function () {
  'use strict';

  angular
    .module('months')
    .factory('MonthsService', MonthsService);

  MonthsService.$inject = ['$resource', '$log'];

  function MonthsService($resource, $log) {
    var Month = $resource('/api/months/:monthId', {
      monthId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Month.prototype, {
      createOrUpdate: function () {
        var month = this;
        return createOrUpdate(month);
      }
    });

    return Month;

    function createOrUpdate(month) {
      if (month._id) {
        return month.$update(onSuccess, onError);
      } else {
        return month.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(month) {
        // Any required internal processing from inside the service, goes here.
      }

      // Handle error response
      function onError(errorResponse) {
        var error = errorResponse.data;
        // Handle error internally
        handleError(error);
      }
    }

    function handleError(error) {
      // Log error
      $log.error(error);
    }
  }
}());
