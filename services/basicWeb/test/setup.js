'user strict'

var config   = require('../config');
var mongoose = require('mongoose');
var User     = require('../models/user');

module.exports = function(done) {
  connectMongoose()
    .then(clearUsers())
    .then(createTestUser())
    .then(done)
    .catch(done);
};



function connectMongoose() {
  return new Promise(function(resolve, reject) {
    // only connect once
    if (mongoose.connection.readyState !== 0) {
      return reject(Error("Exiting, Mongoose aleady connected"))
    }

    mongoose.Promise = global.Promise;

    var connectString = `${config.mongoose_url}_test`;
    var mongoOptions = { db: { safe: true }};

    mongoose.connect(connectString, mongoOptions, function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

function clearUsers() {
  // mongoose will return a promise if using exec for remove
  return User.remove({}).exec();
}

function createTestUser() {
  // mongoose will return a promise
  return User.create({
    username: 'jondoe',
    email: 'jondoe@gmail.com',
    password: 'password'
  });
}
