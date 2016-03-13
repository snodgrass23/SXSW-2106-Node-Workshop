const redis  = require('redis');
const config = require('./config').redis;

module.exports = function(){
  var client = redis.createClient(config.port, config.host);

  client.on("ready", function() {
    console.log("Redis connected to: redis://"+config.host+":"+config.port);
  });

  client.on("error", function() {
    console.log("Error: Redis could not connect to: redis://"+config.host+":"+config.port);
  });

  return client
}
