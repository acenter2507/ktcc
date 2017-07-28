'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Month Schema
 */
var MonthSchema = new Schema({
  time: {
    type: Date,
    required: 'Please fill Month date'
  },
  // Unsend, Watting, Approve, reject, ok
  status: {
    type: Number,
    default: 1
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Month', MonthSchema);
