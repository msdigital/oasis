const winston = require('winston')
const logLevels = {
  levels: {
    emerg: 0,
    alert: 1,
    crit: 2,
    error: 3,
    warning: 4,
    notice: 5,
    info: 6,
    debug: 7
  },
  colors: {
    emerg: 'red',
    alert: 'red',
    crit: 'red',
    error: 'red',
    warning: 'yellow',
    notice: 'blue',
    info: 'green',
    debug: 'green'
  }
}
winston.addColors(logLevels)
const logger = winston.createLogger({
  levels: logLevels.levels,
  transports: [
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true
    })
  ],
  format: winston.format.printf(log => `[${log.level.toUpperCase()}] - ${log.message}`),
});

logger.JSON = function (value) {
  this.info(JSON.stringify(value));
}

module.exports = logger;