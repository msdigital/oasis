var express = require('express')
  , debug = require('debug')('router')
  , router = express.Router()
  , async = require('async')
  , api = require('../api')
  , { Server } = require('../model/server')
  , Player = require('../model/player')
  , Vehicle = require('../model/vehicle')
  , GeoJson = require('../model/geojson')

/* get map image */
router.get('/api/map.jpg', function(req, res, next){
  api.getMap((map) => {
    res.set({'Content-Type': 'image/png'});
    res.send(map.body);
  })
})

router.get('/api/geo.json', function(req, res, next){
  api.getEntities((server) => {
    var players = Player.getPlayers(server.Slots.Player)
    var vehicles = Vehicle.getVehicles(server.Vehicles.Vehicle)
    var geoJson = GeoJson.generate(players, vehicles)

    res.send(geoJson)
  })
})

/* get default options */
router.get('/', function(req, res, next){
  async.parallel({
    server: function(cb){
      api.getEntities((res) => { cb(null, res) })
    },
    game: function(cb){
      api.getSavegame((res) => { cb(null, res) })
    },
    economy: function(cb){
      api.getEconomy((res) => { cb(null, res) })
    }
  },
  function(err, results){
    res.render('home',{
      entities: {
        players: Player.getPlayers(results.server.Slots.Player),
        vehicles: Vehicle.getVehicles(results.server.Vehicles.Vehicle)
      },
      server: new Server(results.server, results.game),
      economy: results.economy
    })
  })
})

module.exports = router;
