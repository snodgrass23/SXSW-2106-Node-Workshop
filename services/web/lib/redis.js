'use strict'

const redis  = require('redis');
const config = require('./config');

module.exports = function(){

  // when deployed, this can pick up the production redis instance
  // in this example, it's using the redis_togo service on Heroku

  var connectString = config.redistogo_url || config.redis_url;
  var client = redis.createClient(connectString);

  client.on("ready", function() {
    console.log(`Redis connected to: ${connectString}`);
  });

  client.on("error", function() {
    console.log(`Error: Redis could not connect to: ${connectString}`);
  });

  return client
}
