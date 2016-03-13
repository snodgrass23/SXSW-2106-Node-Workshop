#!/usr/bin/env node

"use strict";

require('./mongoose');

var config  = require('./config');

var User = require('./models/user');

var jackrabbit = require('jackrabbit');
var rabbit = jackrabbit(config.rabbit_url);

rabbit
  .default()
  .queue({ name: 'sxsw2016_user_create' })
  .consume(onUserCreate, { noAck: true });


function onUserCreate (username) {
  User.findBy('username', username, function(err, user) {
    if (err) {
      return console.log(`error finding user: ${username}`);
    }

    console.log(`Sending welcome email to ${user.email} for ${user.username}`);
  });
}
