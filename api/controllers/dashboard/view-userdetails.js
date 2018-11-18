module.exports = {

  friendlyName: 'View user detail page',

  description: 'Display the stats of a selected user.',

  inputs: {
    userId: {
      description: 'Id of the displayed user',
      type: 'string'
    }
  },

  exits: {
    success: {
      viewTemplatePath: 'pages/dashboard/userdetails',
      description: 'Display the user stats page for authenticated users.'
    },
    invalid: {
      viewTemplatePath: '500',
      description: 'Something went wrong.'
    }
  },

  fn: async function (inputs, exits) {
    try {
      const stats = await Statslog.find({
        where: {
          user: inputs.userId
        },
        sort: 'createdAt DESC',
        limit: 100
      });

      const arrays = {};

      stats.forEach(statlog => {
        for (i in statlog) {
          if (!_.contains(['updatedAt', 'user', 'id'], i)) {
            if (!(i in arrays)) {
              arrays[i] = [];
            }
            arrays[i].unshift(statlog[i]);
          }
        }
      });

      const user = await Muser.findOne({ id: inputs.userId });

      return exits.success({ arrays, user });
    }
    catch (err) {
      sails.log.error(err);
      return exits.invalid();
    }
  }
};
