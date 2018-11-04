/**
 * MuserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var Emailaddresses = require('machinepack-emailaddresses');

module.exports = {
  list: async (req, res) => {
    const users = await Muser.find()
      .populate('investmentLog')
      .populate('gamblingLog')
      .populate('pingLog')
      .populate('statsLog')
      .populate('upgradeLog');
    return res.ok(users);
  },
  login: async (req, res) => {
    var user = await Muser.findOne({ email: req.param('email') });
    if (!user) {
      return res.notFound();
    }

    await bcrypt.compare(req.param('password'), user.password);

    var token = jwt.sign({ user: user.id }, sails.config.JWTsecret, { expiresIn: sails.config.JWTexpires });

    res.cookie('sailsjwt', token, {
      signed: true,
      domain: 'betherichest-1994.appspot.com',
      maxAge: sails.config.JWTexpires
    });

    return res.ok(token);
  },
  logout: async (req, res) => {
    res.clearCookie('sailsjwt');
    req.user = null;
    return res.ok();
  },
  register: async (req, res) => {
    if (_.isUndefined(req.param('email'))) {
      return res.badRequest('An email address is required.')
    }

    if (_.isUndefined(req.param('password'))) {
      return res.badRequest('A password is required.')
    }

    if (req.param('password').trim().length < 8) {
      return res.badRequest('Password must be at least 8 characters.')
    }

    Emailaddresses.validate({
      string: req.param('email'),
    }).exec({
      error: function (err) {
        return res.serverError(err)
      },
      invalid: function () {
        return res.badRequest('Doesn\'t look like an email address.')
      },
      success: async function () {
        console.log(req.param('email'), req.body.email)
        var user = await sails.helpers.createUser.with({
          email: req.param('email'),
          password: req.param('password'),
        })

        // after creating a user record, log them in at the same time by issuing their first jwt token and setting a cookie
        var token = jwt.sign({ user: user.id }, sails.config.JWTsecret, { expiresIn: sails.config.JWTexpires })
        res.cookie('sailsjwt', token, {
          signed: true,
          // domain: '.yourdomain.com', // always use this in production to whitelist your domain
          maxAge: sails.config.JWTexpires
        })

        // if this is not an HTML-wanting browser, e.g. AJAX/sockets/cURL/etc.,
        // send a 200 response letting the user agent know the signup was successful.
        if (req.wantsJSON) {
          return res.ok(token)
        }

        // otherwise if this is an HTML-wanting browser, redirect to /welcome.
        return res.redirect('/welcome')
      }
    })
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

