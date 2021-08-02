const Page = require('./page')

class Temperature extends Page {

  get current () {
    return $('.temps .first span:nth-child(1)')
  }

  get lowest () {
    return $('.low-temp-text')
  }

  get highest () {
    return $('.high-temp-text')
  }
}


module.exports = new Temperature();