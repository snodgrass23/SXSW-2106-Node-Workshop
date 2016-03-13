"use strict";

var path     = require('path');
var passport = require('passport');
var User;

module.exports = function (app) {

  User = app.models.User;

  app.get('/', [
    getAllUsers,
    render('index')
  ]);

  app.get('/details/:username', [
    getUser,
    render('details')
  ]);

  app.get('/signup', [
    render('signup')
  ]);

  app.post('/signup', [
    createUser,
    redirect('/')
  ]);

  app.post('/login', [
    auth(),
    redirect('/')
  ]);

  app.post('/logout', [
    logout,
    redirect('/')
  ]);
}


function auth() {
  return passport.authenticate('local', { failureRedirect: '/' });
}

function logout(req, res, next) {
  req.logout();
  return next();
}

function render(view) {
  return function (req, res) {
    return res.render(path.join(__dirname, `views/${view}`));
  };
}

function redirect(url) {
  return function (req, res) {
    return res.redirect(url);
  };
}

function getUser(req, res, next) {
  User.findBy('username', req.params.username, function(err, user) {
    res.locals.user = user;
    return next();
  });
}

function getAllUsers(req, res, next) {
  User.find({}, function(err, users) {
    res.locals.users = users;
    return next();
  });
}

function createUser(req, res, next) {
  User.create(req.body, function(err) {
    if (err) {
      var err_message = ((err+"").indexOf("duplicate key error") > -1) ? "That email address or username is already registered." : err;

      if (err.name == 'ValidationError') {
        err_message = "Please check the following fields: ";
        var error_fields = [];

        for (let error in errors) {
          error_fields.push(errors[error].path);
        }

        err_message += error_fields.join(", ");
      }

      req.flash(err_message);
      return res.redirect('/');
    }
    else return next();
  });
}
