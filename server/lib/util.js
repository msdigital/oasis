var xjs = require('xml-js')
  , icons = require('./icons').type

module.exports.convert2json = function (xml) {
  var res = xjs.xml2js(xml, { compact: true, spaces: 2 });
  return res;
}

module.exports.filterFloat = function (value) {
  if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/
    .test(value))
    return Number(value);
  return NaN;
}

module.exports.calcCoords = function(size, x,y){
  var newX = null
  var newY = null

  if(x!=null && y!=null) {
    newX = (x / (size / 2))*375
    newY = ((y / (size / 2))*375)*(-1)    
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