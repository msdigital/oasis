var util = require('../lib/util')

module.exports.Game = function (game) {
  var timeScale = Number(game.settings.timeScale._text)
  var playTime = Number(game.statistics.playTime._text)
  var serverTime = playTime * timeScale

  this.money = util.formatNumber(game.statistics.money._text, 0, ' €')
  this.playtime = util.calcAndFormatTime(serverTime)
  this.mapname = game.settings.mapTitle._text
  this.timeScale = util.formatNumber(timeScale, 0, "x")
  this.saveInterval = util.formatNumber(game.settings.autoSaveInterval._text, 0, '')
  this.difficulty = game.settings.difficulty._text
  this.economicDifficulty = game.settings.economicDifficulty._text
}