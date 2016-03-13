#!/usr/bin/env node

"use strict";

var express = require('express');
var app     = express();

var config  = require('./lib/config');

// connect mongoose
require('./lib/mongoose')

app.models = {
  User: require('./models/user')
}

require('./lib/middleware')(app);
require('./lib/routes')(app);


// start app listener
app.listen(config.port, function () {
  console.log(`Basic Web Service listening on port ${config.port}!`);
});
