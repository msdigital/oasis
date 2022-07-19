var express = require('express')
  , router = express.Router()
  , api = require('../api')
  , Geo = require('../lib/geojson')

router.get('/map.jpg', function (req, res, next) {
  api.getMap((map) => {
    res.set({ 'Content-Type': 'image/png' });
    res.send(map.body);
  })
})

router.get('/geo.json', function (req, res, next) {
  api.getEntities((entities) => {
    var objects = [...Geo.createObjects(entities.players), ...Geo.createObjects(entities.vehicles)];
    res.json(Geo.createGeoJson(objects));
  })
})

module.exports = router;