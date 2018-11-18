/**
 * ClientinfoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  leaderboard: async (req, res) => {
    try {
      const top100 = await Lateststats.find({
        sort: 'totalMoneyCollected DESC',
        limit: 100
      }).populate('user');
      const returnData = top100.map(entity => ({ name: entity.user.email, money: entity.totalMoneyCollected }));
      return res.json(returnData);
    }
    catch (err) {
      return res.badRequest(err);
    }
  }

};

