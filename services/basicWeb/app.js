#!/usr/bin/env node

"use strict";

var express = require('express');
var app     = express();

var config  = require('./config');

// connect mongoose
require('./mongoose')

app.models = {
  User: require('./models/user')
}

require('./middleware')(app);
require('./routes')(app);


// start app listener
app.listen(config.port, function () {
  console.log(`Basic Web Service listening on port ${config.port}!`);
});
