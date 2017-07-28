// Workdates service used to communicate Workdates REST endpoints
(function () {
  'use strict';

  angular
    .module('workdates')
    .factory('WorkdateApi', WorkdateApi);

  WorkdateApi.$inject = ['$http'];

  function WorkdateApi($http) {
    this.get_workdates_by_month = month => {
      return $http.get('/api/workdates/months', { params: { month: month } });
    };
  }
}());
