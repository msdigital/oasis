var util = require('../lib/util')

module.exports.Server = function(server){
  this.name = server.name
  this.version = server.version
}

module.exports.Slots = function(slots){
  this.onlineCount = slots.numUsed
  this.maxCount = slots.capacity
}