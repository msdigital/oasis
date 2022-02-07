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
  "tractor": {
    "icon": "tractor.png",
    "desc": "Tractor",
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
  "forklifts": icons.forklifts,
  "cultivator": icons.cultivator,
  "tractor": icons.tractor,
  "trucks": icons.trucks,
  "watertrailer": icons.watertrailer,
  "fertilizerspreaders": icons.fertilizerspreaders,
  "car": icons.car,
}

module.exports = {
  type: types,
  icons: icons
}