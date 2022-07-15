const express = require('express')
  , createError = require('http-errors')
  , cookieParser = require('cookie-parser')
  , path = require('path')
  , config = require('../config.server')
  , i18n = require('./lib/i18n')
  , api = require('./api')
  , logger = require('./lib/logger');

const server = express();

server.set('views', path.join(__dirname, '../client'));
server.set('view engine', 'pug');

server.use(express.json());
server.use(express.urlencoded({ extended: false}));
server.use(express.static(path.join(__dirname, '../public')));

server.use(function(req, res, next){
  res.locals.currentPage = req.url
  res.locals.config = config;
  res.locals.icons = require('./lib/icons').icons
  next();
});

server.use(cookieParser())
server.use(i18n);

var viewRouter = require('./routes/index')
  , apiRouter = require('./routes/api');

server.use('/api',apiRouter)
server.use('/', viewRouter);

server.use(function (req, res, next) {
  next(createError(404));
})

server.use(function(err, req, res, next) {
  logger.error(err.message + ': ' + err.statusCode + ' ' + req.method + ' ' + req.originalUrl)
  api.getServerOnly((server) => {
    res.status(err.statusCode).render('error', {
      server: server,
      error: err
    })
  })
})

// server.use(errorRouter);

// server.use(function(err, req, res, next){
//   logger.JSON(err.message);
//   res.status(err.status || 500);
//   res.render('error',{
//     error: {
//       status: 500,
//       message: err.message
//     }
//   });
// })

var serverPort = config.WEB_PORT >= 0 ? config.WEB_PORT : 3000;

server.listen(serverPort, () => {
  logger.info('Oasis ' + config.VERSION + ' started on port ' + serverPort);
})