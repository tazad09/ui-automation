const Page = require('./page')

class Search extends Page {

  get searchInput () {
    return $('#searchForm > input[type=text]')
  }

  get searchButton () {
    return $('#searchForm > a.searchButton')
  }

  async search (value) {
    await(await this.searchInput).clearValue();
    await(await this.searchInput).addValue(value);
    await(await this.searchButton).click();

  }

  open() {
    return super.open()
  }

}

module.exports = new Search();