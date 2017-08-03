'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Department = mongoose.model('Department'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Department
 */
exports.create = function (req, res) {
  var department = new Department(req.body);
  department.user = req.user;

  department.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(department);
    }
  });
};

/**
 * Show the current Department
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var department = req.department ? req.department.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  department.isCurrentUserOwner = req.user && department.user && department.user._id.toString() === req.user._id.toString();

  res.jsonp(department);
};

/**
 * Update a Department
 */
exports.update = function (req, res) {
  var department = req.department;

  department = _.extend(department, req.body);

  department.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(department);
    }
  });
};

/**
 * Delete an Department
 */
exports.delete = function (req, res) {
  var department = req.department;

  department.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(department);
    }
  });
};

/**
 * List of Departments
 */
exports.list = function (req, res) {
  Department.find().sort('-created')
    .populate('leader', 'displayName email')
    .populate('user', 'displayName')
    .exec()
    .then(departments => {
      if (departments.length === 0) return res.jsonp([]);
      var length = departments.length;
      var counter = 0;
      departments.forEach(function (instance, index, array) {
        array[index] = instance.toObject();
        count_user_by_departmentId(array[index]._id, userId)
          .then(result => {
            array[index].memberCnt = result || 0;
            if (++counter === length) {
              res.jsonp(departments);
            }
          })
          .catch(handleError);
      });
    }, handleError);
  function handleError(err) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  }
};

/**
 * Department middleware
 */
exports.departmentByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Department is invalid'
    });
  }

  Department.findById(id)
    .populate('user', 'displayName')
    .populate('leader', 'displayName email')
    .exec(function (err, department) {
      if (err) {
        return next(err);
      } else if (!department) {
        return res.status(404).send({
          message: 'No Department with that identifier has been found'
        });
      }
      req.department = department;
      next();
    });
};

/**
 * Count user in department
 */
exports.count_user_by_departmentId = departmentId => {
  return new Promise((resolve, reject) => {
    User.find({ department: departmentId }).count(function (err, count) {
      if (err) {
        return reject(err);
      } else {
        return resolve(count);
      }
    });
  });
}