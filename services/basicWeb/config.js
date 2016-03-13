"user strict"

const PORT = 3000;

module.exports = (function () {

  var config = {
    port: PORT,
    mongoose_url: "mongodb://localhost/sxsw2016"
  }

  // add in local environment variables
  for (property in process.env) {
    config[property] = process.env[property];
  }

  return config;
})();
