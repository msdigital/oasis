var lodash = require('lodash')

module.exports.Server = function(server){
  this.name = server._attributes.name
  this.version = server._attributes.version
  this.mods = getMods(server.Mods.Mod)
}

module.exports.Slots = function(slots){
  this.onlineCount = slots.numUsed
  this.maxCount = slots.capacity
}

var getMods = function(mods){
  var results = []
  if (!Array.isArray(mods)) {
    mods = [mods];
  }

  mods.forEach(mod => {
    if (!lodash.isEmpty(mod)) {
      results.push(new Mod(mod))
    }
  })
  return results
}

var Mod = function(mod) {
  // link = http://176.57.169.251:8600/mods/FS22_1970sCowshed.zip
  // download all active = http://176.57.169.251:8600/all_mods_download?onlyActive=true
  this.name = mod._text
  this.filename = mod._attributes.name
  this.author = mod._attributes.author
  this.version = mod._attributes.version
}