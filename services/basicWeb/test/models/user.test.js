var should = require('should');
var User  = require('../../models/user');

describe('User', function () {

  before(require('../setup'));

  describe('create new user', function() {
    it ('should be able to create a new user', function(done) {
      var userProps = {
        email: 'snodgrass23@gmail.com',
        username: 'snodgrass23',
        password: 'password'
      };

      User.create(userProps, function(err) {
        should.not.exist(err);
        done();
      });
    });
  })

  describe('findBy', function() {
    it('should be able to find by username', function(done) {
      User.findBy('username', 'snodgrass23', function(err, user){
        should.not.exist(err);
        user.email.should.equal('snodgrass23@gmail.com');
        done();
      });
    });

    it('should be able to find by email', function(done) {
      User.findBy('email', 'snodgrass23@gmail.com', function(err, user){
        should.not.exist(err);
        user.email.should.equal('snodgrass23@gmail.com');
        done();
      });
    });
  })

  describe('auth', function() {
    it('should be able to auth', function(done) {
      User.auth('snodgrass23', 'password', function(err, user) {
        user.email.should.equal('snodgrass23@gmail.com');
        done();
      })
    });
  })
});
