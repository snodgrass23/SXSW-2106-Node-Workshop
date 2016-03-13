var config   = require('./config');
var mongoose = require('mongoose');

module.exports = (function(config_in) {
  // only connect once
  if (mongoose.connection.readyState !== 0) return;

  // when deployed, this can pick up the production mongoose instance
  // in this example, it's using the mongolab service on Heroku


  var connectString = config.mongolab_uri || config.mongoose_url;

  if (config.NODE_ENV) connectString += `_${config.NODE_ENV}`;

  // Ensure safe writes
  var mongoOptions = { db: { safe: true }};

  mongoose.connect(connectString, mongoOptions, function(err) {
    if (err) console.log ('ERROR connecting to: ' + connectString + '. ' + err);
    else console.log ('Mongoose connected to: ' + connectString);
  });
})();
