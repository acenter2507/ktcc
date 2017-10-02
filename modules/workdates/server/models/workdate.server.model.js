'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Workdate Schema
 */
var WorkdateSchema = new Schema({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  monthdb: { type: Schema.ObjectId, ref: 'Month' }, // Liên kết tháng trong db
  date: { type: Number, required: true },
  work: { type: String, trim: true }, // 業務内容
  start: { type: String, default: '' }, // 開始
  end: { type: String, default: '' }, // 終了
  middleRest: { type: Number, default: 1 }, // 休憩 (hour)
  overtime: { type: Number, default: 0 }, // 時間外
  late: { type: Number, default: 0 }, // 深夜
  comment: { type: String, trim: true }, // Approve, reject, waiting
  restmode: { type: Schema.ObjectId, ref: 'Restmode' }, // 休日形態
  transfer: { type: Boolean, default: false }, // 振替
  created: { type: Date, default: Date.now },
  updated: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
});

mongoose.model('Workdate', WorkdateSchema);
