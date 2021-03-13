var config = require('../config/config')

module.exports.getIcon = function(object){
  var icons = config.icons

  if(object=="farmer"){
    return icons['farmer']
  }
  else if(icons.hasOwnProperty(object.type)){
    return icons[object.type]
  }
  else if(icons.hasOwnProperty(object.category)){
    return icons[object.category]
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