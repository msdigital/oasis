var express = require('express')
  , request = require('superagent')
  , config = require('../config/config')
  , debug = require('debug')('api')
  , xjs = require('xml-js')
  , Server = require('./model/server')
  // , MapIcons = require('./mapIcons.js')

module.exports = {}

var convert2json = function(xml){
  var res = xjs.xml2js(xml, {compact: true, spaces: 2} );
  return res;
}

module.exports.getMap = function(cb){
  request
    .get('http://' + config.gameserver.ip + '/feed/dedicated-server-stats-map.jpg?code=' + config.gameserver.code + '&quality=100&size=1024')
    .end(function(err, map) {
      if(err){
        debug(err)
      }
      cb(map)
    })
}

module.exports.getEntities = function(cb){
  //http://176.57.171.68:8130/feed/dedicated-server-stats.xml?code=PD2oeshz
  request
    .get('http://' + config.gameserver.ip + '/feed/dedicated-server-stats.xml?code=' + config.gameserver.code)
    .end(function (err, xml) {
      if(err){
        debug(err)
      }
      var result = convert2json(xml.body)
      cb(result.Server)
    })
}

module.exports.getSavegame = function(cb){
  //http://176.57.171.68:8130/feed/dedicated-server-savegame.html?code=PD2oeshz&file=careerSavegame
  request
    .get('http://' + config.gameserver.ip + '/feed/dedicated-server-savegame.html?code=' + config.gameserver.code + '&file=careerSavegame')
    .end(function (err, xml) {
      if(err){
        debug(err)
      }
      var result = convert2json(xml.body)
      cb(result.careerSavegame)
    })
}

module.exports.getEconomy = function(cb){
  cb(null)
  //http://176.57.171.68:8130/feed/dedicated-server-savegame.html?code=PD2oeshz&file=economy
  // request
  //   .get('http://' + config.gameserver.ip + '/feed/dedicated-server-savegame.html?code=' + config.gameserver.code + '&file=economy')
  //   .end(function (err, xml) {
  //     if(err){
  //       debug(err)
  //     }
  //     cb(convert2json(xml.body))
  //   })
}