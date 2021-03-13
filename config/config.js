var merge = require('lodash').merge
  , config = require('./main.json')
  , debug = require('debug')('config')

if (process.env.DEV_ENV ) {
  debug(process.env.DEV_ENV+'.json')
  merge(config, require('./' + (process.env.DEV_ENV  + '.json')))
}

module.exports = config
