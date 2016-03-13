#!/usr/bin/env node

"use strict";

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  var debugMode = ( process.execArgv &&
                    process.execArgv[0] &&
                    process.execArgv[0].indexOf('--debug') > -1);

  var simpleMode = ( process.argv[2] == 'simple' );

  if (debugMode || simpleMode) {
    return startServices();
  }

  cluster.on('disconnect', function(worker) {
    console.error('Cluster worker disconnect! Forking new worker.');
    cluster.fork();
  });

  for (var i = 0; i < numCPUs; i++) {
    // Create a worker
    cluster.fork();
  }
}

// cluster workers
else {
  startServices();
}


function startServices () {
  require(`./services/web`);
  require(`./services/worker`);
}
