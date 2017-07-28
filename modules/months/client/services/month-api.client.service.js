// months service used to communicate months REST endpoints
(function () {
  'use strict';

  angular
    .module('months')
    .factory('MonthApi', MonthApi);

 MonthApi.$inject = ['$http'];

  function MonthApi($http) {
    this.get_months_by_month = month => {
      return $http.get('/api/months/months', { params: { month: month } });
    };
  }
}());
