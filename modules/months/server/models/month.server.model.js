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
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  status: { type: Number, default: 1 },// Unsend, Watting, Approve, Reject, Ok
  comment: { type: String, default: '' }, // レビューする人からのコメント
  worked: { type: Number, default: 0 }, // 出勤した日数
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
});

mongoose.model('Month', MonthSchema);
