"use strict";

var mongoose = require('mongoose');

module.exports = (function() {

  var User = new mongoose.Schema({
    username: String,
    email: String
  });

  User.statics.findBy = function(prop, value, callback) {
    var search = {};
    search[prop] = value.toLowerCase();

    this.findOne(search, callback);
  }

  // Export

  return mongoose.model('User', User);

})();
