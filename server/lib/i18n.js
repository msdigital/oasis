var i18n = require('i18n')

var getLocalization = function(req,res,next) {
  i18n.configure({
    locales: res.locals.config.SUPPORTED_LANGUAGES,
    directory: __dirname + '/../locales',
    defaultLocale: res.locals.config.DEFAULT_LANGUAGE,
    cookie: 'lang'
  });

  i18n.init(req,res,next);
}

module.exports = getLocalization;