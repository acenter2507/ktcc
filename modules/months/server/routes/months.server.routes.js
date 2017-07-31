'use strict';

/**
 * Module dependencies
 */
var monthsPolicy = require('../policies/months.server.policy'),
  months = require('../controllers/months.server.controller');

module.exports = function (app) {
  app.route('/api/months/byyear').all(monthsPolicy.isAllowed).get(months.byyear);
  app.route('/api/months/bymonth').all(monthsPolicy.isAllowed).get(months.bymonth);
  // months Routes
  app.route('/api/months').all(monthsPolicy.isAllowed)
    .get(months.list)
    .post(months.create);

  app.route('/api/months/:monthId').all(monthsPolicy.isAllowed)
    .get(months.read)
    .put(months.update)
    .delete(months.delete);
  // Finish by binding the month middleware
  app.param('monthId', months.monthByID);
};
