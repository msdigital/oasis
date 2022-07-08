var express = require('express')
  , router = express.Router()
  , async = require('async')
  , api = require('../api')
  , Geo = require('../lib/geojson')

router.get('/api/map.jpg', function (req, res, next) {
  api.getMap((map) => {
    res.set({ 'Content-Type': 'image/png' });
    res.send(map.body);
  })
})

var _server = null;

router.get('*', function (req, res, next){
  api.getEntities((entities) => {
    _server = entities;
    next();
  })
})

router.get('/economy', function(req, res, next){
  async.waterfall([
    function (cb) {
      api.getSavegame((game) => {
        cb(null, game.economicDifficulty)
      })
    },
    function (difficulty, cb) {
      api.getEconomy((economy) => {
        economy.calculateEconomy(difficulty,cb)
      })
    }
  ],
  function(err, result){
    res.render('economy', {
      server: _server.server,
      economy: result //economy callback
    })
  })
})

router.get('/mods', function (req, res, next) {
  res.render('mods', {
    server: _server.server
  })
})

router.get('/api/geo.json', function (req, res, next) {
  var objects = [...Geo.createObjects(_server.players), ...Geo.createObjects(_server.vehicles)];
  res.json(Geo.createGeoJson(objects));
})

router.get('/', function(req, res, next){
  async.parallel({
    savegame: function (cb) {
      api.getSavegame((res) => { cb(null, res) })
    }
  },
  function (err, results) {
    res.render('home', {
      game: results.savegame,
      slots: _server.slots,
      server: _server.server,
      players: _server.players
    });
  })
})

module.exports = router;