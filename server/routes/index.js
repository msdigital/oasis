var express = require('express')
  , router = express.Router()
  , async = require('async')
  , api = require('../api')

router.get('/lang/:lang', function (req, res) {
  res.setLocale(req.params.lang)
  res.cookie('lang', req.params.lang);
  res.redirect('back');
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