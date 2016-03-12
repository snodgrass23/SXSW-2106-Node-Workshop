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
  res.locals.user = User.find_by('username', req.params.username);
  return next();
}

function getAllUsers(req, res, next) {
  res.locals.users = User.all();
  return next();
}
