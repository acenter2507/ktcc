'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Restmode Schema
 */
var RestmodeSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Restmode work content',
    trim: true
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

mongoose.model('Restmode', RestmodeSchema);
