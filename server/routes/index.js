var express = require('express')
  , router = express.Router()
  , async = require('async')
  , api = require('../api')

router.get('/lang/:lang', function (req, res) {
  res.setLocale(req.params.lang)
  res.cookie('lang', req.params.lang);
  res.redirect('back');
})

var _server = null
  , _savegame = null;

router.get('*', function (req, res, next){
  async.parallel({
    game: function(cb) {
      api.getSavegame((res) => { cb(null, res) })
    },
    entities: function(cb) {
      api.getEntities((res) => { cb(null, res) })
    }
  },
  function (err, results) {
    _server = results.entities
    _savegame = results.game
    res.locals.isNewServer = _savegame.isNewServer
    next()
  })
})

router.get('/economy', function(req, res, next){
  api.getEconomy((economy) => {
    economy.calculateEconomy(_savegame.economicDifficulty, (eco) => {
      res.render('economy', {
        server: _server.server,
        economy: eco //economy callback
      })
    })
  })
})

router.get('/mods', function (req, res, next) {
  res.render('mods', {
    server: _server.server
  })
})

router.get('/', function(req, res, next){
  res.render('home', {
    game: _savegame,
    slots: _server.slots,
    server: _server.server,
    players: _server.players
  });
})

module.exports = router;