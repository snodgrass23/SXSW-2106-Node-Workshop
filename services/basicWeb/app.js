#!/usr/bin/env node

var express         = require('express');
var stylus          = require('stylus');
var path            = require('path');
var serveStatic     = require('serve-static');

var app = express();
var User = require('./models/user')


// app config
app.set('view engine', 'jade');


// Middleware
app.use(stylus.middleware({
  src: path.join(__dirname, '/styles'),
  dest: path.join(__dirname, '/public')
}))
app.use(serveStatic(path.join(__dirname, '/public')));


// Routes
app.get('/', function (req, res) {
  return res.render(path.join(__dirname, 'views/index'), {
    users: User.all()
  });
});

app.get('/details/:username', function (req, res) {
  return res.render(path.join(__dirname, 'views/details'), {
    user: User.find_by('username', req.params.username)
  });
});


// start app listener
app.listen(3000, function () {
  console.log('Basic Web Service listening on port 3000!');
});
