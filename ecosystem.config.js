const config = require('../config.server')

const PROJECT_NAME = 'oasis';
const NODE_VER = '16.9.1';

// Target server hostname or IP address
const TARGET_SERVER_HOST = process.env.TARGET_SERVER_HOST ? process.env.TARGET_SERVER_HOST.trim() : '';
// Target server username
const TARGET_SERVER_USER = process.env.TARGET_SERVER_USER ? process.env.TARGET_SERVER_USER.trim() : '';
// Target server application path
const TARGET_SERVER_APP_PATH = `/home/${TARGET_SERVER_USER}/www/`+config.name;
// Your repository
const REPO = `git@github.com:msdigital/${PROJECT_NAME}.git`;

module.exports = {
  apps: [
    {
      name: PROJECT_NAME,
      interpreter: "node@" + NODE_VER,
      script: 'server/app',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: config.WEB_PORT
      }
    }
  ],
  deploy: {
    production: {
      user: TARGET_SERVER_USER,
      host: TARGET_SERVER_HOST,
      ref: 'origin/master',
      repo: REPO,
      ssh_options: 'StrictHostKeyChecking=no',
      path: TARGET_SERVER_APP_PATH,
      'post-deploy': 'npm install --production'
        + ' && pm2 startOrRestart ecosystem.config.js --env=production'
        + ' && pm2 save'
    }
  }
};
