var xjs = require('xml-js')
  , icons = require('./icons')

module.exports.convert2json = function (xml) {
  var res = xjs.xml2js(xml, { compact: true, spaces: 2 });
  return res;
}

module.exports.getIcon = function(object){
  if(object=="farmer"){
    return icons['farmer']
  }
  else if(icons.hasOwnProperty(object.category.toLowerCase())){
    return icons[object.category.toLowerCase()]
  }
  else if (icons.hasOwnProperty(object.type.toLowerCase())) {
    return icons[object.type.toLowerCase()]
  }
  return icons['default']
}

module.exports.calcCoords = function(x,y){
  var newX = null
  var newY = null

  if(x!=null && y!=null) {
    newX = (x/1024)*375
    newY = ((y/1024)*375)*(-1)    
  }

  return {x: newX, y: newY}
}

module.exports.calcAndFormatTime = function(oldtime){
  var pHours = 0;
  oldtime = Math.floor(Number(oldtime));

  if(oldtime>=60){
    var pHours = Math.floor(Number(oldtime)/60);
    var pMinutes = (Number(oldtime) - (pHours*60));
  }
  else{
    pMinutes = Number(oldtime);
  }

  if(pHours>=24){
    var pDays = Math.floor(Number(pHours)/24);
    var pHours = (pHours - (pDays*24));
  }

  return (pDays>0 ? pDays + 'd ' : '') + pHours+'h '+pMinutes+'m';
}

module.exports.formatNumber = function(number,digits,icon){
  var n = Number(number);
  return n.toLocaleString(undefined, { minimumFractionDigits: digits }) + icon;
}