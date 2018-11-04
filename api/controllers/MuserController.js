/**
 * MuserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  add: async (req, res) => {
    const newuser = await Muser.create({ macAddress: '123456789' });
    return res.ok({ newuser });
  },
  list: async (req, res) => {
    const users = await Muser.find()
      .populate('investmentLog')
      .populate('gamblingLog')
      .populate('pingLog')
      .populate('statsLog')
      .populate('upgradeLog');
    return res.ok(users);
  },
  register: async (req, res) => {
    return res.notFound({ message: 'unimplemented' });
  },
  login: async (req, res) => {
    return res.notFound({ message: 'unimplemented' });
  },
  logStats: async (req, res) => {
    try {
      const rb = req.body;
      const user = await Muser.find().limit(1);
      const statsLog = await Statslog.create({
        ...rb,
        user: user[0].id
      }).fetch();
      return res.ok({ user, statsLog });
    }
    catch (err) {
      return res.badRequest(err);
    }
  },
  logInvestment: async (req, res) => {
    try {
      const rb = req.body;
      const user = await Muser.find().limit(1);
      const investmentLog = await Investmentlog.create({
        ...rb,
        user: user[0].id
      }).fetch();

      return res.ok({ user, investmentLog });
    }
    catch (err) {
      return res.badRequest(err);
    }
  },
  logUpgrade: async (req, res) => {
    try {
      const rb = req.body;
      const user = await Muser.find().limit(1);
      const upgradeLog = await Upgradelog.create({
        ...rb,
        user: user[0].id
      }).fetch();

      return res.ok({ user, upgradeLog });
    }
    catch (err) {
      return res.badRequest(err);
    }
  },
  logGambling: async (req, res) => {
    try {
      const rb = req.body;
      const user = await Muser.find().limit(1);
      const gamblingLog = await Gamblinglog.create({
        ...rb,
        user: user[0].id
      }).fetch();

      return res.ok({ user, gamblingLog });
    }
    catch (err) {
      return res.badRequest(err);
    }
  },
  logPing: async (req, res) => {
    try {
      const rb = req.body;
      const user = await Muser.find().limit(1);
      const pingLog = await Pinglog.create({
        ...rb,
        user: user[0].id
      }).fetch();

      return res.ok({ user, pingLog });
    }
    catch (err) {
      return res.badRequest(err);
    }
  }
};

