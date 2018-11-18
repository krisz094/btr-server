const USERDETAILS_CHARTVARS = [
  { varname: 'currentMoney', explanation: 'Money', unit: '$' },
  { varname: 'totalMoneyCollected', explanation: 'Money Collected', unit: '$' },
  { varname: 'totalMoneySpent', explanation: 'Money Spent', unit: '$' },
  { varname: 'moneyFromVideos', explanation: 'Money from videos', unit: '$' },
  { varname: 'moneyFromGambling', explanation: 'Money from gambling', unit: '$' },
  { varname: 'moneyFromClicks', explanation: 'Money from clicks', unit: '$' },
  { varname: 'moneyFromInvestments', explanation: 'Money from investments', unit: '$' },

  { varname: 'currentClicks', explanation: 'Clicks', unit: 'Clicks' },
  { varname: 'currentPlaytime', explanation: 'Playtime', unit: 'Seconds' },
  { varname: 'totalInvestmentLevels', explanation: 'Total investments', unit: 'Investments' },
  { varname: 'upgradesBought', explanation: 'Total upgrades', unit: 'Upgrades' },

  { varname: 'videosWatched', explanation: 'Videos watched', unit: 'Videos' },
  { varname: 'achievementsUnlocked', explanation: 'Achievements unlocked', unit: 'Achievements' },
]

function USERDETAILS_DRAWCHART(chartvar) {
  return function () {
    var dataArr = [
      ['Time', chartvar.unit]
    ];
    var createdAts = SAILS_LOCALS['arrays']['createdAt'];
    var sailsData = SAILS_LOCALS['arrays'][chartvar.varname];
    sailsData.forEach((data, idx) => {
      dataArr.push([new Date(createdAts[idx]), data]);
    });
    var data = google.visualization.arrayToDataTable(dataArr);
    /* var data = google.visualization.arrayToDataTable([
      ['Year', 'Sales', 'Expenses'],
      ['2004', 1000, 400],
      ['2005', 1170, 460],
      ['2006', 660, 1120],
      ['2007', 1030, 540]
    ]); */

    var options = {
      title: chartvar.explanation,
      legend: { position: 'none' },
      height: 400,
      animation: {
        startup: true,
        duration: 1000,
        easing: 'inAndOut'

      }
    };

    var chart = new google.visualization.LineChart(document.getElementById(chartvar.varname + '-chart'));

    chart.draw(data, options);
  }
}

parasails.registerPage('userdetails', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {

  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    // Attach any initial data from the server.
    _.extend(this, SAILS_LOCALS);
  },
  mounted: async function () {
    google.charts.load('current', { 'packages': ['corechart'] });
    const container = document.getElementById('userdetails-charts');
    USERDETAILS_CHARTVARS.forEach(chartvar => {
      container.innerHTML += '<div class="col-6"><div id="' + chartvar.varname + '-chart"><h5>' + chartvar.explanation + '</h5> </div></div>'
      google.charts.setOnLoadCallback(USERDETAILS_DRAWCHART(chartvar));
    });

    console.log('fefe')
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {



  }
});
