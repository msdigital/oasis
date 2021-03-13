var map = L.map('map', { crs: L.CRS.Simple, maxZoom:5 })

var bounds = [[-375,-375], [375,375]];
var image = L.imageOverlay('/api/map.jpg', bounds).addTo(map);
map.fitBounds(bounds)
map.setMaxBounds(bounds)

map.on('drag', function() {
  map.panInsideBounds(bounds, { animate: false })
})

function onEachFeature(feature, layer) {
  if (layer instanceof L.Marker) {
    console.log(layer)
    layer.bindPopup(layer.feature.properties.name)
    var customIcon = L.icon({
      iconUrl: '/images/icons/'+layer.feature.properties.icon.icon,
      iconSize: [layer.feature.properties.icon.width, layer.feature.properties.icon.height],
      iconAnchor: [(layer.feature.properties.icon.width/2), (layer.feature.properties.icon.height/2)],
      popupAnchor: [0, -10]
    })
    layer.setIcon(customIcon)
  }
};

$(document).ready(function()
{
  $.ajax({
    type: "GET",
    url: "/api/geo.json",
    dataType: "json",
    success: function(geojson){
      new L.GeoJSON(geojson, { onEachFeature: onEachFeature }).addTo(map);
    }
  });
});

