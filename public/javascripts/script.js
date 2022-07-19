function onEachFeature(feature, layer) {
  if (layer instanceof L.Marker) {
    layer.bindPopup(layer.feature.properties.popup)
    var customIcon = L.icon({
      iconUrl: '/images/icons/'+layer.feature.properties.icon.icon,
      iconSize: [layer.feature.properties.icon.dimension, layer.feature.properties.icon.dimension],
      iconAnchor: [(layer.feature.properties.icon.dimension / 2), (layer.feature.properties.icon.dimension/2)],
      popupAnchor: [0, -10]
    })
    layer.setIcon(customIcon)
  }
};

function isUrl(needle) {
  return window.location.href.indexOf(needle) > -1 ? true : false;
}

$(document).ready(function() {
  if (isUrl("economy")) {
    $('.eco-table').on("click", "tr", function () {
      $('.eco-table-active').removeClass('eco-table-active');
      $(this).addClass('eco-table-active');
    })
  }
  else {
    var map = L.map('map', { crs: L.CRS.Simple, maxZoom: 5 })

    var bounds = [[-750, -750], [750, 750]];
    var image = L.imageOverlay('/api/map.jpg', bounds).addTo(map);
    map.fitBounds([[-375, -375], [375, 375]])
    map.setMaxBounds([[-375, -375], [375, 375]])

    map.on('drag', function () {
      map.panInsideBounds([[-375, -375], [375, 375]], { animate: false })
    })

    $.ajax({
      type: "GET",
      url: "/api/geo.json",
      dataType: "json",
      success: function (geojson) {
        new L.GeoJSON(geojson, { onEachFeature: onEachFeature }).addTo(map);
      }
    });
  }
});

