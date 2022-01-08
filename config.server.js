const { exitOnError } = require('./server/lib/logger');
var logger = require('./server/lib/logger');

require('dotenv').config()

var config = {};
var errored = false;

config.WEB_PORT = process.env.WEB_PORT;
config.SERVER_IP = process.env.SERVER_IP;
config.SERVER_KEY = process.env.SERVER_KEY;

// put required parameters befor this check to ensure they are checked
for (const [k,v] of Object.entries(config)){
  if (v == "" || typeof v == 'undefined'){
    logger.error(k+" missing! Please check configuration!");
    errored = true;
  }
}

if (errored) process.exit();

config.VERSION = process.env.npm_package_version;

module.exports = config;