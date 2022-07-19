module.exports = () => {
  var version = process.env.npm_package_version ? process.env.npm_package_version : '0';

  try {
    version = require('./appversion.js')
    return version
  }
  catch (err){
    console.error(err)
    return version
  }
}