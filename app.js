#!/usr/bin/env node

"use strict";

// run all services
const SERVICES = new Set(['helloWorld']);

for (let service of SERVICES) {
  require(`./services/${service}`);
}
