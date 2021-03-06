module.exports = {


  friendlyName: 'View leaderboard page',


  description: 'Display the dashboard "Leaderboard" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/leaderboard',
      description: 'Display the leaderboard page for authenticated users.'
    },
    invalid: {
      viewTemplatePath: '500',
      description: 'Something went wrong.'
    }

  },


  fn: async function (inputs, exits) {
    function formatPlaytime(playtime) {

    }
    try {
      const top100 = await Lateststats.find({
        sort: 'totalMoneyCollected DESC',
      }).populate('user');
      return exits.success({ top100, formatPlaytime });
    }


    catch (err) {
      sails.log.error(err);
      return exits.invalid();
    }
  }
};
