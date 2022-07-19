var request = require('superagent')
  , util = require('./lib/util')
  , config = require('../config.server')
  , { Game } = require('./model/game')
  , { Server, Slots } = require('./model/server')
  , { Economy } = require('./model/economy')
  , Player = require('./model/player')
  , Vehicle = require('./model/vehicle')
  , logger = require('./lib/logger');

module.exports.getMap = function (cb) {
  request
    .get('http://' + config.SERVER_IP + '/feed/dedicated-server-stats-map.jpg?code=' + config.SERVER_KEY + '&quality=100&size=2048')
    .end(function (err, map) {
      if (err) {
        logger.error(err);
      }
      cb(map)
    })
}

var getServerStatsXml = function(cb) {
  request
    .get('http://' + config.SERVER_IP + '/feed/dedicated-server-stats.xml?code=' + config.SERVER_KEY)
    .end(function (err, xml) {
      if (err) {
        logger.error(err);
      }
      var result = util.convert2json(xml.body)
      cb(result)
    })
}

module.exports.getServerOnly = function (cb) {
  getServerStatsXml((result) => {
    cb(new Server(result.Server))
  })
}

module.exports.getEntities = function (cb) {
  getServerStatsXml((result) => {
    cb({
      server: new Server(result.Server),
      slots: new Slots(result.Server.Slots._attributes),
      players: Player.getPlayers(result.Server.Slots.Player),
      vehicles: Vehicle.getVehicles(result.Server.Vehicles.Vehicle, result.Server._attributes.mapSize)
    })
  })
}

module.exports.getSavegame = function (cb) {
  request
    .get('http://' + config.SERVER_IP + '/feed/dedicated-server-savegame.html?code=' + config.SERVER_KEY + '&file=careerSavegame')
    .end(function (err, xml) {
      if (err) {
        logger.error(err);
      }
      var result = util.convert2json(xml.body)
      cb(new Game(result.careerSavegame))
    })
}

module.exports.getEconomy = function(cb) {
  request
    .get('http://176.57.169.251:8600/feed/dedicated-server-savegame.html?code=M8La9eRC&file=economy')
    .end(function (err, xml) {
      if (err) {
        logger.error(err);
      }
      var result = util.convert2json(xml.body)
      cb(new Economy(result.economy))
    })
}