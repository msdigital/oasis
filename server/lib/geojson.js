module.exports.createObjects = function(objects){
  var geos = []
  objects.forEach((obj) => {
    if(obj.posx!=null){
      geos.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [obj.posx, obj.posy]
        },
        properties: {
          name: obj.name,
          icon: obj.icon,
          desc: obj.icon.desc
        }
      });
    }
  })
  return geos;
}

module.exports.createGeoJson = function(objects) {
  var json = {
    type: "FeatureCollection",
    features: objects,
  }
  return JSON.stringify(json);
}