'use strict';

/**
 * Module dependencies
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Months Permissions
 */
exports.invokeRolesPolicies = function () {
  acl.allow([{
    roles: ['admin'],
    allows: [{
      resources: '/api/months',
      permissions: '*'
    }, {
      resources: '/api/months/:monthId',
      permissions: '*'
    }, {
      resources: '/api/months/byyear',
      permissions: '*'
    }, {
      resources: '/api/months/bymonth',
      permissions: '*'
    }]
  }, {
    roles: ['user'],
    allows: [{
      resources: '/api/months',
      permissions: ['get', 'post']
    }, {
      resources: '/api/months/:monthId',
      permissions: ['get']
    }, {
      resources: '/api/months/byyear',
      permissions: '*'
    }, {
      resources: '/api/months/bymonth',
      permissions: '*'
    }]
  }]);
};

/**
 * Check If months Policy Allows
 */
exports.isAllowed = function (req, res, next) {
  var roles = (req.user) ? req.user.roles : ['guest'];

  // If an month is being processed and the current user created it then allow any manipulation
  if (req.month && req.user && req.month.user && req.month.user.id === req.user.id) {
    return next();
  }

  // Check for user roles
  acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function (err, isAllowed) {
    if (err) {
      // An authorization error occurred
      return res.status(500).send('Unexpected authorization error');
    } else {
      if (isAllowed) {
        // Access granted! Invoke next middleware
        return next();
      } else {
        return res.status(403).json({
          message: 'User is not authorized'
        });
      }
    }
  });
};
