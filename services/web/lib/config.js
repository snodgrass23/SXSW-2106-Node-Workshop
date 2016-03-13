"user strict"

const PORT = 3000;

module.exports = (function () {

  var config = {
    port: PORT,
    mongoose_url: "mongodb://localhost/sxsw2016",
    rabbit_url: "amqp://guest:guest@localhost:5672",
    redis: {
      host: "localhost",
      port: 6379,
      auth: "",
      debug: false
    }
  }

  // add in local environment variables
  for (property in process.env) {
    config[property] = process.env[property];
  }

  return config;
})();
