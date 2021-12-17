const { json } = require('express');
const logger = require('../lib/logger');

var express = require('express')
  , router = express.Router()
  , async = require('async')
  , api = require('../api')
  , Geo = require('../lib/geojson')
  , Player = require('../model/player')
  , Vehicle = require('../model/vehicle')

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

router.get('/api/geo.json', function (req, res, next) {
  var objects = [...Geo.createObjects(_server.players), ...Geo.createObjects(_server.vehicles)];
  res.send(Geo.createGeoJson(objects));
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