var should = require('should');
var User  = require('../../models/user');

describe('User', function () {
  describe('find_by', function() {
    it('should be able to find by username', function() {
      User.find_by('username', 'snodgrass23').email.should.equal('snodgrass23@gmail.com');
    });
  })

  describe('auth', function() {
    it('should be able to find by username', function(done) {
      User.auth('snodgrass23', 'password', function(err, user) {
        user.email.should.equal('snodgrass23@gmail.com');
        done();
      })
    });
  })
});
