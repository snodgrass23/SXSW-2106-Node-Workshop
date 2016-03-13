"user strict"

module.exports = (function () {

  var config = {
    mongoose_url: "mongodb://localhost/sxsw2016",
    rabbit_url: "amqp://guest:guest@localhost:5672"
  }

  // add in local environment variables
  for (property in process.env) {
    config[property.toLowerCase()] = process.env[property.toLowerCase()];
  }

  return config;
})();
