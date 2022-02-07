var lodash = require('lodash')
  , util = require('../lib/util')

module.exports.getVehicles = function(vehicles){
  var results = []
  vehicles.forEach(vehicle => {
    if(!lodash.isEmpty(vehicle)){
      results.push(new this.Vehicle(vehicle))
    }
  })
  return results
}

module.exports.Vehicle = function(vehicle){
  var coords = util.calcCoords(vehicle._attributes.x, vehicle._attributes.z)

  this.name = vehicle._attributes.name
  this.posx = coords.x
  this.posy = coords.y
  this.type = vehicle._attributes.type
  this.category = vehicle._attributes.category
  this.icon = util.getIcon(vehicle._attributes)
  this.popup = util.getIconPopup(vehicle._attributes)
}