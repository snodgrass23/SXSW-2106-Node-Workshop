"use strict";

var stylus       = require('stylus');
var path         = require('path');
var serveStatic  = require('serve-static');
var passport     = require('passport');
var Strategy     = require('passport-local').Strategy;

module.exports = function(app) {

  var User = app.models.User;

  // app config
  app.set('view engine', 'jade');


  // passport setup
  passport.use(new Strategy(function(username, password, callback) {
    User.auth(username, password, callback)
  }));
  passport.serializeUser(function(user, callback) {
    callback(null, user.username);
  });
  passport.deserializeUser(function(username, callback) {
    User.findBy('username', username, callback);
  });


  // Middleware
  app.use(stylus.middleware({
    src: path.join(__dirname, '../styles'),
    dest: path.join(__dirname, '../public')
  }))
  app.use(serveStatic(path.join(__dirname, '../public')));
  app.use(require('morgan')('combined'));
  app.use(require('cookie-parser')());
  app.use(require('body-parser').urlencoded({ extended: true }));
  app.use(require('express-session')({ secret: 'sxsw2016', resave: false, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());


  // locals for views
  app.use(function(req, res, next) {
    let isLoggedIn = req.isAuthenticated();
    res.locals.is_logged_in = isLoggedIn;

    if (isLoggedIn) {
      User.findBy('username', req.session.passport.user, function(err, user) {
        res.locals.current_user = user;
        return next();
      });
    }
    else {
      return next();
    }
  });

  // flash messaging
  app.use(function(req, res, next) {
    req.flash = function(message) {
      var messages = req.session.messages || [];
      messages.push(message);
      req.session.messages = messages;
    };
    return next();
  });

  app.use(function(req, res, next) {
    res.locals.getMessages = function() {
      var messages = req.session.messages || [];
      req.session.messages = [];
      return messages;
    };
    return next();
  });
}
