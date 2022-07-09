//////////////////////////////////////////////////////
// DO NOT CHANGE THIS FILE IT MAY BREAK THE APP!
//////////////////////////////////////////////////////
// AENDERUNGEN AN DIESER DATEI KOENNEN DAZU FUEHREN
// DASS DIE APP NICHT MEHR KORREKT FUNKTIONIERT!
//////////////////////////////////////////////////////
const { exitOnError } = require('./server/lib/logger');
var logger = require('./server/lib/logger');

require('dotenv').config()

var config = {};
var errored = false;

config.WEB_PORT = process.env.WEB_PORT;
config.SERVER_IP = process.env.SERVER_IP;
config.SERVER_KEY = process.env.SERVER_KEY;
config.DEFAULT_LANGUAGE = process.env.DEFAULT_LANGUAGE;

// put required parameters befor this check to ensure they are checked
for (const [k,v] of Object.entries(config)){
  if (v == "" || typeof v == 'undefined'){
    logger.error(k+" missing! Please check configuration!");
    errored = true;
  }
}

if (errored) process.exit();

config.SUPPORTED_LANGUAGES = ['en','de'];
config.VERSION = process.env.npm_package_version ? process.env.npm_package_version : 'V1.22.5';

module.exports = config;