var util = require('./util')

/*
  All icons need to have the following format:
  Filetype: .png
  Size: 32x32px
  
  !! Please try not to use an icon twice for another vehicle category or type !!

  If an icon is too big or dominant on the map, just lower the dimension so it appears smaller.
  Dimension should range between min: 10 and max: 32 for best fitting
*/
var icons = {
  "farmer": { //needs to match vehicle type or category out of dedi server stats xml
    "icon": "farmer.png", //filename /public/images/icons/...
    "desc": "Farmer", //Icon type Name
    "dimension": 32 //Icon dimension
  },
  "harvesters": {
    "icon": "harvester.png",
    "desc": "Harvester",
    "dimension": 32
  },
  "trailer": {
    "icon": "trailer.png",
    "desc": "Trailers",
    "dimension": 32
  },
  "car": {
    "icon": "cars.png",
    "desc": "Car",
    "dimension": 32
  },
  "trucks": {
    "icon": "trucks.png",
    "desc": "Trucks",
    "dimension": 40
  },
  "tractorsl": {
    "icon": "tractorsl.png",
    "desc": "Tractor Large",
    "dimension": 32
  },
  "tractorsm": {
    "icon": "tractorsm.png",
    "desc": "Tractor Medium",
    "dimension": 32
  },
  "tractorss": {
    "icon": "tractorss.png",
    "desc": "Tractor Small",
    "dimension": 32
  },
  "cultivator": {
    "icon": "cultivator.png",
    "desc": "Cultivator",
    "dimension": 32
  },
  "fertilizerspreaders": {
    "icon": "fertilizerspreaders.png",
    "desc": "Fertilizer Spreaders",
    "dimension": 32
  },
  "forklifts": {
    "icon": "forklift.png",
    "desc": "Forklifts",
    "dimension": 32
  },
  "watertrailer": {
    "icon": "watertrailer.png",
    "desc": "Watertrailer",
    "dimension": 24
  },
  "seeders": {
    "icon": "seeder.png",
    "desc": "Seeders",
    "dimension": 32
  },
  "balers": {
    "icon": "balers.png",
    "desc": "Baler",
    "dimension": 32
  },
  "baleloaders": {
    "icon": "baleloaders.png",
    "desc": "Baleloader",
    "dimension": 32
  },
  "plows": {
    "icon": "plows.png",
    "desc": "Plow",
    "dimension": 32
  },
  "pallet": {
    "icon": "pallet.png",
    "desc": "Product Pallet",
    "dimension": 16
  },
  "bigbags": {
    "icon": "crate.png",
    "desc": "Bigbags",
    "dimension": 16
  },
  "train": {
    "icon": "train.png",
    "desc": "Train",
    "dimension": 10
  },
  "default": {
    "icon": "default.png",
    "desc": "Diverse",
    "dimension": 10
  },
};

var types = {
  "farmer": icons.farmer,
  "default": icons.default,
  "harvesters": icons.harvesters,
  "traintrailer": icons.train,
  "traintimbertrailer": icons.train,
  "trailer": icons.trailer,
  "seeders": icons.seeders,
  "bigbags": icons.bigbags,
  "pallet": icons.pallet,
  "forklifts": icons.forklifts,
  "cultivator": icons.cultivator,
  "tractorsl": icons.tractorsl,
  "tractorsm": icons.tractorsm,
  "tractorss": icons.tractorss,
  "trucks": icons.trucks,
  "watertrailer": icons.watertrailer,
  "fertilizerspreaders": icons.fertilizerspreaders,
  "plows": icons.plows,
  "balers": icons.balers,
  "baleloaders": icons.baleloaders,
  "cars": icons.car,
}

module.exports = {
  type: types,
  icons: icons
}

module.exports.getIcon = function (object) {
  if (object == "farmer") {
    return icons['farmer']
  }
  else if (icons.hasOwnProperty(object.category.toLowerCase())) {
    return icons[object.category.toLowerCase()]
  }
  else if (icons.hasOwnProperty(object.type.toLowerCase())) {
    return icons[object.type.toLowerCase()]
  }
  return icons['default']
}

module.exports.getIconPopup = function (object) {
  var popup = '<b>' + object.name + '</b>'

  popup += '<small>'
  if (!isNaN(util.filterFloat(object.fillLevels))) {
    if (object.fillTypes.toLowerCase() != 'unknown') {
      popup += '<br><span style="text-transform: capitalize;">' + object.fillTypes.toLowerCase() + '</span> (' + object.fillLevels + ')'
    }
    else if (object.fillTypes.toLowerCase() == 'unknown') {
      popup += '<br>Empty'
    }
  }

  if (object.isAIActive == "true") {
    popup += '<br>Helper: active'
  }
  popup += '</small>'

  return popup;
}