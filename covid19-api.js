// eslint-disable-next-line no-unused-vars
class Covid19Api {
  constructor() {
    this.country = 'IND';
  }

  async getDataForCountry() {
    const fetchCovidCases = await fetch('https://corona.lmao.ninja/countries/IND');
    const response = await fetchCovidCases.json();
    return {
      response,
    };
  }
}
