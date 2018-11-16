const WELCOME_CHART_FNS = {
  drawMoneyPie: function () {

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Source');
    data.addColumn('number', 'All money made');
    data.addRows([
      ['Gambling', SAILS_LOCALS.gamblingMoney],
      ['Clicks', SAILS_LOCALS.clicksMoney],
      ['Videos', SAILS_LOCALS.videosMoney],
      ['Investments', SAILS_LOCALS.investmentsMoney],
    ]);

    // Set chart options
    var options = {
      'title': '',
      'width': '100%',
      'height': 300,

    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('money-pie'));
    chart.draw(data, options);
  },
  drawLast7DaysRegisteredUsers: function () {
    var data = [
      ['Days before', 'Registered User']
    ];
    SAILS_LOCALS['last7DaysRegisteredUsers'].forEach((day, idx) => {
      data.push([6 - idx + ' days ago', day])
    })

    data = google.visualization.arrayToDataTable(data);

    var options = {
      chart: {
        title: '',
        subtitle: '',
      },
      animation: {
        startup: true,
        duration: 800,
        easing: 'inAndOut'
      },
      legend: { position: "none" },
    };
    var chart = new google.visualization.ColumnChart(document.getElementById('last7DaysRegisteredUsers-chart'));
    chart.draw(data, options);
  },
  drawLast7DaysChart: function (varname, varexplanation) {
    return function () {
      var data = [
        ['Days before', varexplanation]
      ];
      SAILS_LOCALS[varname].forEach((day, idx) => {
        data.push([6 - idx + ' days ago', day])
      })

      data = google.visualization.arrayToDataTable(data);

      var options = {
        chart: {
          title: '',
          subtitle: '',
        },
        animation: {
          startup: true,
          duration: 800,
          easing: 'inAndOut'
        },
        legend: { position: "none" },
      };
      var chart = new google.visualization.ColumnChart(document.getElementById(varname + '-chart'));
      chart.draw(data, options);
    }
  }
}

// charts to draw
/**
 * last7DaysRegisteredUsers
 * last7DaysGambles
 * last7DaysGamblesWon
 * last7DaysPurchasedInvestments
 * last7DaysPurchasedUpgrades
 * last7DaysOpens
 * last7DaysCloses
 */


parasails.registerPage('welcome', {
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
    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.

    //…
    console.log('dash loaded');
    // Load the Visualization API and the corechart package.
    google.charts.load('current', { 'packages': ['corechart', 'bar'] });

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(WELCOME_CHART_FNS.drawMoneyPie);
    google.charts.setOnLoadCallback(WELCOME_CHART_FNS.drawLast7DaysChart('last7DaysRegisteredUsers', 'Registered Users'));
    google.charts.setOnLoadCallback(WELCOME_CHART_FNS.drawLast7DaysChart('last7DaysGambles', 'Registered Users'));
    google.charts.setOnLoadCallback(WELCOME_CHART_FNS.drawLast7DaysChart('last7DaysGamblesWon', 'Registered Users'));
    google.charts.setOnLoadCallback(WELCOME_CHART_FNS.drawLast7DaysChart('last7DaysPurchasedInvestments', 'Registered Users'));
    google.charts.setOnLoadCallback(WELCOME_CHART_FNS.drawLast7DaysChart('last7DaysPurchasedUpgrades', 'Registered Users'));
    google.charts.setOnLoadCallback(WELCOME_CHART_FNS.drawLast7DaysChart('last7DaysOpens', 'Registered Users'));
    google.charts.setOnLoadCallback(WELCOME_CHART_FNS.drawLast7DaysChart('last7DaysCloses', 'Registered Users'));

  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {



  }
});
