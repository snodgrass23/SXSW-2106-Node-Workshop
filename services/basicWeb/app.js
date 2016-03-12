#!/usr/bin/env node

"use strict";

var express = require('express');
var app     = express();

app.models = {
  User: require('./models/user')
}

require('./middleware')(app);
require('./routes')(app);


// start app listener
app.listen(3000, function () {
  console.log('Basic Web Service listening on port 3000!');
});
