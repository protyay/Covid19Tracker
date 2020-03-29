
// eslint-disable-next-line no-undef
const stateWiseCovid19 = new StateCovidChart();

const deathCount = document.getElementById('death-count');
const deathCaseDelta = document.getElementById('death-delta');

const recoveryCaseCount = document.getElementById('recovery-count');
const recoveredCaseDelta = document.getElementById('recovered-delta');

const confirmedCaseDelta = document.getElementById('confirmed-delta');
const confirmedCaseCount = document.getElementById('confirmed-count');

const activeCaseCount = document.getElementById('active-count');


function getChartData() {
  const stateWiseDiv = document.getElementById('state-covid19-stats').getContext('2d');


  const stateCovidDataSet = stateWiseCovid19.getChartData();
  console.log(stateCovidDataSet);
  stateCovidDataSet.then((covid19StateData) => {
    deathCount.innerText = covid19StateData.totalDeaths;
    deathCaseDelta.innerText = `+${covid19StateData.deltaCumulativeValue.deceaseddelta}`;

    recoveryCaseCount.innerText = covid19StateData.totalRecovered;
    recoveredCaseDelta.innerText = `+${covid19StateData.deltaCumulativeValue.recovereddelta}`;

    confirmedCaseCount.innerText = covid19StateData.totalConfirmed;
    confirmedCaseDelta.innerText = `+${covid19StateData.deltaCumulativeValue.confirmeddelta}`;

    activeCaseCount.innerText = covid19StateData.totalActiveCases;

    const stateNamesList = covid19StateData.statList.filter(value => value.confirmedCase > 2).map((value) => value.stateName);
    const confirmedCaseForStates = covid19StateData.statList
                                                  .filter(value => value.confirmedCase > 2)
                                                  .map(value => value.confirmedCase);

    // eslint-disable-next-line no-undef,no-unused-vars
    const chart = new Chart(stateWiseDiv, {
      type: 'bar',

      data: {
        labels: stateNamesList,
        datasets: [{
          label: 'Total Cases',
          data: confirmedCaseForStates,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgb(255, 99, 232)',
        }],
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            categoryPercentage: 0.3,
            barPercentage: 0.6,
          }]
        }
      },
    });
  }).catch((error) => console.log(error));
}
getChartData();
