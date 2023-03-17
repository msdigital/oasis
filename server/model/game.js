var util = require('../lib/util')

module.exports.Game = function (game) {
  var timeScale = game.settings !== undefined ? Number(game.settings.timeScale._text) : 0
  var playTime = game.statistics !== undefined ? Number(game.statistics.playTime._text) : 0
  var serverTime = playTime * timeScale

  this.money = util.formatNumber(game.statistics.money._text, 0, ' €')
  this.playtime = util.calcAndFormatTime(serverTime)
  this.mapname = game.settings !== undefined ? game.settings.mapTitle._text : '-'
  this.timeScale = util.formatNumber(timeScale, 0, "x")
  this.saveInterval = game.settings !== undefined ? util.formatNumber(game.settings.autoSaveInterval._text, 0, '') : 0
  this.difficulty = game.settings !== undefined ? game.settings.difficulty._text : '-'
  this.economicDifficulty = game.settings !== undefined ? game.settings.economicDifficulty._text : '-'
  this.isNewServer = game.settings === undefined || game.statistics === undefined ? true : false
}