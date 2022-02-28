var request = require('superagent')
  , util = require('./lib/util')
  , config = require('../config.server')
  , { Game } = require('./model/game')
  , { Server, Slots } = require('./model/server')
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

module.exports.getEntities = function (cb) {
  //http://176.57.171.68:8130/feed/dedicated-server-stats.xml?code=PD2oeshz
  request
    .get('http://' + config.SERVER_IP + '/feed/dedicated-server-stats.xml?code=' + config.SERVER_KEY)
    .end(function (err, xml) {
      if (err) {
        logger.error(err);
      }
      var result = util.convert2json(xml.body)
      cb({
        server: new Server(result.Server._attributes),
        slots: new Slots(result.Server.Slots._attributes),
        players: Player.getPlayers(result.Server.Slots.Player),
        vehicles: Vehicle.getVehicles(result.Server.Vehicles.Vehicle, result.Server._attributes.mapSize)
      })
    })
}

module.exports.getSavegame = function (cb) {
  //http://176.57.171.68:8130/feed/dedicated-server-savegame.html?code=PD2oeshz&file=careerSavegame
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