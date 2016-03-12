"use strict";

const USERS = require('../data/users')

function User() {}

User.prototype = {
  all: function() {
    return USERS;
  },

  find_by: function(prop, value) {
    return USERS.find(function(user) {
      return user[prop] == value;
    });
  },

  auth: function(username, password, callback) {
    let user = USERS.find(function(user) {
      return user.username == username && user.password == password;
    });
    if (!user) return callback('No user with those credentials', null);
    return callback(null, user);
  }
}


exports = module.exports = new User();
