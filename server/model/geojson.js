var util = require('../util')

module.exports.generate = function(players, vehicles){
  var geos = []
  players.forEach((player) => {
    if (player.posx!=null){
      geos.push(new this.GeoObject(player))
    }
  })
  vehicles.forEach((vehicle) => {
    if(vehicle.posx!=null){
      geos.push(new this.GeoObject(vehicle))
    }
  })

  var meta = new this.MetaObject(geos)
  return JSON.stringify(meta)
}

module.exports.MetaObject = function(geos){
  this.type = "FeatureCollection"
  this.features = geos
}

module.exports.GeoObject = function(obj){
  this.type = "Feature"
  this.geometry = {
    "type": "Point",
    "coordinates": [obj.posx,obj.posy]
  }
  this.properties = {
    "name": obj.name,
    "icon": obj.icon,
    "desc": obj.icon.desc
  }
}