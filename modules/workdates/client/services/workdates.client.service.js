// Workdates service used to communicate Workdates REST endpoints
(function () {
  'use strict';

  angular
    .module('workdates')
    .factory('WorkdatesService', WorkdatesService);

  WorkdatesService.$inject = ['$resource', '$log'];

  function WorkdatesService($resource, $log) {
    var Workdate = $resource('api/workdates/:workdateId', {
      workdateId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });

    angular.extend(Workdate.prototype, {
      createOrUpdate: function () {
        var workdate = this;
        return createOrUpdate(workdate);
      }
    });

    return Workdate;

    function createOrUpdate(workdate) {
      if (workdate._id) {
        return workdate.$update(onSuccess, onError);
      } else {
        return workdate.$save(onSuccess, onError);
      }

      // Handle successful response
      function onSuccess(workdate) {
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
