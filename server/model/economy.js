var lodash = require('lodash')
  , util = require('../lib/util')

var EXCLUDED_PRODUCTS = [
  "COW_SWISS_BROWN", "COW_HOLSTEIN", "COW_LIMOUSIN", "COW_ANGUS",
  "SHEEP_LANDRACE", "SHEEP_SWISS_MOUNTAIN", "SHEEP_STEINSCHAF", "SHEEP_BLACK_WELSH",
  "PIG_LANDRACE", "PIG_BLACK_PIED", "PIG_BERKSHIRE",
  "SQUAREBALE_GRASS", "SQUAREBALE_DRYGRASS", "SQUAREBALE", "SQUAREBALE_COTTON", "SQUAREBALE_WOOD",
  "HERBICIDE", "SILAGE_ADDITIVE", "MINERAL_FEED",
  "LIME", "FORAGE", "FORAGE_MIXING", "TREESAPLINGS", "OILSEEDRADISH", "POPLAR",
  "DIESEL", "DEF", "ELECTRICCHARGE", "METHANE",
  "ROUNDBALE", "ROUNDBALE_GRASS", "ROUNDBALE_DRYGRASS", "ROUNDBALE_COTTON",
  "LIQUIDFERTILIZER",
]

var ECONOMY_MONTHS = [
  {},
  { "month": 2, "name": "Mar." },
  { "month": 3, "name": "Apr." },
  { "month": 4, "name": "May" },
  { "month": 5, "name": "Jun." },
  { "month": 6, "name": "Jul." },
  { "month": 7, "name": "Aug." },
  { "month": 8, "name": "Sep." },
  { "month": 9, "name": "Oct." },
  { "month": 10, "name": "Nov." },
  { "month": 11, "name": "Dec." },
  { "month": 0, "name": "Jan." },
  { "month": 1, "name": "Feb." },
]

module.exports.Economy = function (economy) {
  this.rawPrices = mapPrices(economy.fillTypes.fillType)

  this.calculateEconomy = function (difficulty, cb) {
    var prices = calcluatePrices(this.rawPrices, getPriceFactor(difficulty))
    var months = getOrderMonths();

    cb(null, { prices: prices, months: months })
  }
}

var getOrderMonths = function () {
  var months = new Array();
  delete ECONOMY_MONTHS[0];

  ECONOMY_MONTHS.forEach((month, ix) => {
    months.splice(month.month, 0, month.name)
  })
  return months;
}

var calcluatePrices = function (fillTypes, factor) {
  var results = []
    , resultPrices = Array(2).fill(null).map(() => Array());

  if (!Array.isArray(fillTypes)) {
    fillTypes = [fillTypes]
  }

  fillTypes.some((fillType, i) => {
    if (!lodash.isEmpty(fillType)) {
      fillType.prices.forEach((price, ix) => {
        if (price > 0) {
          var calcPrice = (price * factor)
            , calcPriceFormat = util.formatNumber(calcPrice, 2, ' €')
            , monthIndex = ECONOMY_MONTHS[ix].month

          resultPrices[0].splice(monthIndex, 0, calcPrice)
          resultPrices[1].splice(monthIndex, 0, calcPriceFormat)
        }
      })
      fillType.prices = resultPrices[0]
      fillType.formattedPrices = resultPrices[1]
      results.push(fillType)
      resultPrices[0] = new Array()
      resultPrices[1] = new Array()
    }
  })
  return results
}

var mapPrices = function (fillTypes) {
  var results = []

  if (!Array.isArray(fillTypes)) {
    fillTypes = [fillTypes];
  }

  fillTypes.forEach(type => {
    if (!lodash.isEmpty(type) && !EXCLUDED_PRODUCTS.includes(type._attributes.fillType)) {
      results.push(new FillType(type))
    }
  })
  return results
}

var FillType = function (type) {
  this.name = type._attributes.fillType
  this.prices = FillTypePrices(type.history.period)
  this.formattedPrices = null
}

var FillTypePrices = function (prices) {
  var results = Array()

  if (!Array.isArray(prices)) {
    prices = [prices];
  }

  prices.forEach(price => {
    if (!lodash.isEmpty(price)) {
      results[price._attributes.period] = Number(price._text)
    }
  })
  return results
}

var getPriceFactor = function (difficulty) {
  switch (difficulty) {
    case "1": return 1
    case "2": return 1.8
    case "3": return 3
    default: return 1
  }
}