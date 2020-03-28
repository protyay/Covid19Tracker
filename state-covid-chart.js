// eslint-disable-next-line no-unused-vars
class StateCovidChart {
  constructor() {
    this.url = 'https://api.covid19india.org/data.json';
  }

  async getChartData() {
    let graphData = { stateName: {}, confirmedCase: {} };
    const statList = [];

    const stateWiseCovidData = await fetch(this.url);
    const responseJson = await stateWiseCovidData.json();

    const lastConfirmedIndex = responseJson.cases_time_series.pop();
    const deltaCumulativeValue = responseJson.key_values[0];
    // Total cases
    // eslint-disable-next-line radix,max-len
    const totalConfirmed = parseInt(lastConfirmedIndex.totalconfirmed) + parseInt(deltaCumulativeValue.confirmeddelta);
    // eslint-disable-next-line radix,max-len
    const totalDeaths = parseInt(lastConfirmedIndex.totaldeceased) + parseInt(deltaCumulativeValue.deceaseddelta);
    // eslint-disable-next-line radix,max-len
    const totalRecovered = parseInt(lastConfirmedIndex.totalrecovered) + parseInt(deltaCumulativeValue.recovereddelta);
    // console.log(`Total confirmed ${totalConfirmed}`);

    // State wise representation
    const totalActiveCases = totalConfirmed - (totalDeaths + totalRecovered);
    responseJson.statewise.forEach((data) => {
      // This is a great ES-Lint Rule
      if (Object.prototype.hasOwnProperty.call(data, 'state', 'confirmed') && data.state !== 'Total') {
        graphData.stateName = data.state;
        graphData.confirmedCase = data.confirmed;
        statList.push(graphData);
        graphData = {};
      }
    });
    console.log(statList);

    return {
      totalConfirmed,
      totalDeaths,
      totalRecovered,
      totalActiveCases,
      deltaCumulativeValue,
      statList,
    };
  }
}
