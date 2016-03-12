#!/usr/bin/env node

"use strict";

var express      = require('express');
var stylus       = require('stylus');
var path         = require('path');
var serveStatic  = require('serve-static');
var passport     = require('passport');
var Strategy     = require('passport-local').Strategy;

var app   = express();
var User  = require('./models/user')


// app config
app.set('view engine', 'jade');


// passport setup
passport.use(new Strategy(User.auth));
passport.serializeUser(function(user, callback) {
  callback(null, user.username);
});
passport.deserializeUser(function(username, callback) {
  let user = User.find_by('username', username);
  callback(null, user);
});


// Middleware
app.use(stylus.middleware({
  src: path.join(__dirname, '/styles'),
  dest: path.join(__dirname, '/public')
}))
app.use(serveStatic(path.join(__dirname, '/public')));
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'sxsw2016', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


// locals for views
app.use(function(req, res, next) {
  res.locals.current_user = req.isAuthenticated() && req.session.passport.user || null;
  res.locals.is_logged_in = (res.locals.current_user !== null);

  return next();
});


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

app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), function(req, res) {
  res.redirect('/');
});

app.post('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
})


// start app listener
app.listen(3000, function () {
  console.log('Basic Web Service listening on port 3000!');
});
