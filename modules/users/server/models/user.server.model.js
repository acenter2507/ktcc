'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  path = require('path'),
  config = require(path.resolve('./config/config')),
  Schema = mongoose.Schema,
  crypto = require('crypto'),
  validator = require('validator'),
  generatePassword = require('generate-password');


/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
  return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email) {
  return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email, { require_tld: false }));
};

/**
 * A Validation function for username
 * - at least 3 characters
 * - only a-z0-9_-.
 * - contain at least one alphanumeric character
 * - not in list of illegal usernames
 * - no consecutive dots: "." ok, ".." nope
 * - not begin or end with "."
 */

// var validateUsername = function(username) {
//   var usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;
//   return (
//     this.provider !== 'local' ||
//     (username && usernameRegex.test(username) && config.illegalUsernames.indexOf(username) < 0)
//   );
// };

/**
 * User Schema
 */
var UserSchema = new Schema({
  username: { type: String, unique: 'Username already exists', required: true, lowercase: true, trim: true },
  // validate: [validateUsername, 'Please enter a valid username: 3+ characters long, non restricted word, characters "_-.", no consecutive dots, does not begin or end with dots, letters a-z and numbers 0-9.'],
  password: { type: String, default: '' },
  firstName: { type: String, trim: true, default: '', required: true },
  lastName: { type: String, trim: true, default: '', required: true },
  displayName: { type: String, trim: true },
  email: {
    type: String,
    index: {
      unique: true,
      sparse: true
    },
    lowercase: true,
    trim: true,
    default: '',
    validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
  },
  private: {
    sex: { type: Number, default: 1 },
    birthdate: { type: Date },
    introduct: { type: String }
  },
  profileImageURL: { type: String, default: 'modules/users/client/img/profile/default.png' },
  department: { type: Schema.ObjectId, ref: 'Department' },
  company: {
    employeeId: { type: String },
    taxId: { type: String },
    duty: { type: String },
    salary: { type: Number }
  },
  report: {
    holidayCnt: { type: Number, default: 0 }
  },
  salt: { type: String },
  provider: { type: String, required: 'Provider is required' },
  providerData: {},
  additionalProvidersData: {},
  roles: {
    type: [{
      type: String,
      enum: ['user', 'admin', 'manage', 'vip']
    }],
    default: ['user'],
    required: 'Please provide at least one role'
  },
  updated: { type: Date },
  created: { type: Date, default: Date.now },
  /* For reset password */
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date }
});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
  if (this.password && this.isModified('password')) {
    this.salt = crypto.randomBytes(16).toString('base64');
    this.password = this.hashPassword(this.password);
  }

  next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
  if (this.salt && password) {
    var pass = crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64, 'SHA1').toString('base64');
    console.log(pass);
    return pass;
  } else {
    return password;
  }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function (password) {
  return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
  var _this = this;
  var possibleUsername = username.toLowerCase() + (suffix || '');

  _this.findOne({
    username: possibleUsername
  }, function (err, user) {
    if (!err) {
      if (!user) {
        callback(possibleUsername);
      } else {
        return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
      }
    } else {
      callback(null);
    }
  });
};

/**
* Generates a random passphrase that passes the owasp test
* Returns a promise that resolves with the generated passphrase, or rejects with an error if something goes wrong.
* NOTE: Passphrases are only tested against the required owasp strength tests, and not the optional tests.
*/
UserSchema.statics.generateRandomPassphrase = function () {
  return new Promise(function (resolve, reject) {
    var password = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&@';
    for (var i = 0; i < 8; i++) {
      password += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return resolve(password);
  });
};

mongoose.model('User', UserSchema);
