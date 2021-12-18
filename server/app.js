const express = require('express')
  , createError = require('http-errors')
  , path = require('path')
  , config = require('../config.server')
  , logger = require('./lib/logger');

const server = express();

server.set('views', path.join(__dirname, '../client'));
server.set('view engine', 'pug');

server.use(express.json());
server.use(express.urlencoded({ extended: false}));
server.use(express.static(path.join(__dirname, '../public')));

server.use(function(req, res, next){
  res.locals.config = config;
  res.locals.icons = require('./lib/icons')
  next();
});

var router = require('./routes/index');
server.use('/',router);

server.use(function(req, res, next){
  next(createError(404));
})

server.use(function(err, req, res, next){
  logger.JSON(err.message);
  res.status(err.status || 500);
  res.render('error',{
    error: {
      status: 500,
      message: err.message
    }
  });
})

var serverPort = config.WEB_PORT >= 0 ? config.WEB_PORT : 3000;

server.listen(serverPort, () => {
  logger.info('Oasis started on port ' + serverPort);
})