"user strict"

const PORT = 3000;

module.exports = (function () {

  var config = {
    port: PORT,
    mongoose_url: "mongodb://localhost/sxsw2016",
    rabbit_url: "amqp://guest:guest@localhost:5672",
    redis_url: "redis://localhost:6379"
  }

  // add in local environment variables
  for (property in process.env) {
    config[property.toLowerCase()] = process.env[property.toLowerCase()];
  }

  return config;
})();
