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
  date: {
    type: Date,
    required: 'Please fill Month date'
  },
  // 業務内容
  work: {
    type: String,
    default: '',
    required: 'Please fill Month work content',
    trim: true
  },
  // 開始
  start: {
    type: Date,
    required: 'Please fill Month start'
  },
  // 終了
  end: {
    type: Date,
    required: 'Please fill Month end'
  },
  // 休憩 (hour)
  middleRest: {
    type: Number,
    default: 1
  },
  // 時間外
  overtime: {
    type: Number,
    default: 0
  },
  // 深夜
  late: {
    type: Number,
    default: 0
  },
  // Approve, reject, waiting
  status: {
    type: Number,
    default: 1
  },
  // 休日形態
  restmode: {
    type: Schema.ObjectId,
    ref: 'Restmode'
  },
  // 振替
  transfer: {
    type: Boolean,
    default: false
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
