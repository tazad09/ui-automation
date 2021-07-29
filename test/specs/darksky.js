
var chaiExpect = require("chai").expect;

describe("Darksky Main page", () => {
  it("should open the main page", async () => {
    await browser.url("https://darksky.net/");
    expect(browser).toHaveTitle("Dark Sky - 1 City Hall, New York, NY");
  });

  it("should search for 10001 and verify the text value of 10001", async () => {
    await browser.url("https://darksky.net/");
    const searchInput = await browser.$('#searchForm');
    const searchButton = await browser.$('.searchForm');


    searchInput.clearValue();
    searchInput.addValue("10001");
    searchButton.click();

    expect(searchInput).toHaveValue("10001");
  });

  it("shoudl verify forecast hours in timeline incremented by 2 hours for next 24 hours", async () => {

    const nowHour = new Date().getHours();

    for (var i = 1; i < 13; i += 2) {
      const selector = `#timeline .hours span:nth-child(${i}) span`
      const span = await browser.$(selector);
      const time = await span.getText();

      var expectedTime = "Now";
      if (i != 1) {
        var n = nowHour + i;
        if (n < 13 || n > 24) {
          if (n > 24) {
            n -= 24;
          }
          expectedTime = n - 1 + "am";
        } else {
          expectedTime = ((n - 1) % 12) + "pm";
        }
      }

      chaiExpect(time).to.be.eq(expectedTime);
    }
  });

  it("should verify current temperature is not less than the lowest value and greater than the highest value", async () => {

    const currentTemp = await browser.$(
      '.temps .first span:nth-child(1)'
    );
    const lowestTemp = await browser.$(
      '.low-temp-text'
    );
    const highestTemp = await browser.$(
      '.high-temp-text'
    );

    const temp = await currentTemp.getText();
    const low = await lowestTemp.getText();
    const high = await highestTemp.getText();

    const tempNumber = await temp.substring(0, temp.length - 1);
    const lowNumber = await low.substring(0, low.length - 1);
    const highNumber = await high.substring(0, high.length - 1);

    chaiExpect(parseInt(tempNumber)).to.be.gt(parseInt(lowNumber));
    chaiExpect(parseInt(tempNumber)).to.be.lt(parseInt(highNumber));
  });


});