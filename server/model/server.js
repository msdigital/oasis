var util = require('../util')

module.exports.Server = function(server, game){
  var timeScale = Number(game.settings.timeScale._text)
  var playTime = Number(game.statistics.playTime._text)
  var serverTime = playTime * timeScale

  this.name = server._attributes.name
  this.onlineCount = server.Slots._attributes.numUsed
  this.maxCount = server.Slots._attributes.capacity
  this.version = server._attributes.version
  this.money = util.formatNumber(game.statistics.money._text,0,' €')
  this.playtime = util.calcAndFormatTime(serverTime)
  this.mapname = game.settings.mapTitle._text
  this.timeScale = util.formatNumber(timeScale,0,"x")
  this.saveInterval = util.formatNumber(game.settings.autoSaveInterval._text,0,'')
}
