var users = [
  {
    username: 'snodgrass23',
    email: 'snodgrass23@gmail.com',
    password: 'password'
  }
]

function User() {
  return this;
}

User.prototype = {
  all: function() {
    return users;
  },

  find_by: function(prop, value) {
    return users.find(function(user) {
      return user[prop] == value;
    });
  }
}


exports = module.exports = new User();
