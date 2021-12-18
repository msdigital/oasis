require('dotenv').config();

var config = {};

if(process.env.WEB_PORT) config.WEB_PORT = process.env.WEB_PORT;
if(process.env.SERVER_IP) config.SERVER_IP = process.env.SERVER_IP;
if(process.env.SERVER_KEY) config.SERVER_KEY = process.env.SERVER_KEY;

config.VERSION = process.env.npm_package_version;

module.exports = config;