"use strict";

var utils = require('mongoose-utils'),
    bcrypt = require('bcrypt'),
    mongoose = require('mongoose');

module.exports = (function() {

  var User = new mongoose.Schema({
    email         : { type: String, index: true, required:true, lowercase: true, trim:true, unique: true, validate: [utils.validate.email, 'not valid'] },
    username      : { type: String, trim: true, required:true, unique: true, validate: [utils.validate.length(4), 'required to be at least 4 characters'] },
    password      : { type: String, trim: true, required:true, validate: [utils.validate.length(4), 'required to be at least 4 characters'] }
  }, {strict:true});

  // Plugins

  User.plugin(utils.plugin.timestamps);
  User.plugin(utils.plugin.extendedMethods);

  // Getters and Setters

  function encrypt(plain) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plain, salt);
  }

  User.path('password').set(function(password) {
    var hashed = encrypt(password);
    if (password && password.length >= 4) return hashed;
    // pass short chars to fail length validation
    return "f";
  });

  // Static methods

  User.statics.auth = function(username, password, callback) {

    if (!password || !username) return callback(new Error("username and password required"));

    // lookup user by username
    this.findBy('username', username, function(err, user){

      // found the user
      if(!err && user) {

        // check password
        if (bcrypt.compareSync(password, user.password)) return callback(null, user);

        // password doesn't match
        return callback(new Error('Unable to login'));
      }

      // did not find user or got error
      else return callback(new Error('Unable to login'));
    });
  };

  User.statics.findBy = function(prop, value, callback) {
    var search = {};
    search[prop] = value.toLowerCase();

    this.findOne(search, function(err, user){
      if(user && !err){
        // trigger save for updated timestamp
        user.save();
        return callback(null, user);
      }
      else return callback(new Error("Unable to find user"));
    });
  }

  // Export

  return mongoose.model('User', User);

})();
