
module.exports = class Page {

   open(path) {
    return browser.url("https://darksky.net/")
  }
}