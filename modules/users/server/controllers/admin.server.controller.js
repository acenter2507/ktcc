'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  _ = require('underscore'),
  User = mongoose.model('User'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Show the current user
 */
exports.read = function (req, res) {
  res.json(req.model);
};

/**
 * Update a User
 */
exports.update = function (req, res) {
  var user = req.model;

  // For security purposes only merge these parameters
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.displayName = user.firstName + ' ' + user.lastName;
  user.roles = req.body.roles;

  user.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * Delete a user
 */
exports.delete = function (req, res) {
  var user = req.model;

  user.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(user);
  });
};

/**
 * List of Users
 */
exports.list = function (req, res) {
  User.find({}, '-salt -password -providerData').sort('-created').populate('user', 'displayName').exec(function (err, users) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(users);
  });
};

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findById(id, '-salt -password -providerData').exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load user ' + id));
    }

    req.model = user;
    next();
  });
};

/**
 * Admin page
 */
exports.loadAdminUsers = function (req, res) {
  var page = req.body.page || 1;
  var condition = req.body.condition || {};
  var sort = condition.sort || '-created';
  var and_arr = [];
  var query = {};
  if (condition.search && condition.search !== '') {
    and_arr.push({ $or: [{ displayName: { $regex: '.*' + condition.search + '.*' } }, { email: { $regex: '.*' + condition.search + '.*' } }] });
  }
  if (condition.status) {
    and_arr.push({ status: condition.status });
  }
  if (condition.roles) {
    if (condition.roles === 'user') {
      and_arr.push({
        $and: [
          { roles: { $ne: 'admin' } },
          { roles: { $ne: 'manage' } },
          { roles: { $ne: 'vip' } }
        ]
      });
    } else if (condition.roles === 'admin') {
      and_arr.push({
        $and: [
          { roles: 'admin' },
          { roles: { $ne: 'manage' } },
          { roles: { $ne: 'vip' } }
        ]
      });
    } else if (condition.roles === 'manage') {
      and_arr.push({
        $and: [
          { roles: 'manager' },
          { roles: { $ne: 'admin' } },
          { roles: { $ne: 'vip' } }
        ]
      });
    }
  }
  if (condition.department) {
    and_arr.push({ department: condition.department });
  }
  if (and_arr.length > 0) {
    query = { $and: and_arr };
  } else {
    query = { roles: { $ne: 'vip' } };
  }
  User.paginate(query, {
    sort: sort,
    page: page,
    limit: 10
  }).then(function (users) {
    res.jsonp(users);
  });
};
