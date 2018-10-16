/**
 * MuserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    add: async (req, res) => {
        const newuser = await Muser.create({ macAddress: '123456789' });
        return res.send(newuser);
    },
    sendClicks: async (req, res) => {
        const user = await Muser.findOne({ id: 1 });
        const click = await Clicklog.create({ clickAmount: 100, clicker: user.id });
        
        return res.send({ click, user });
    },
    list: async (req, res) => {
        const users = await Muser.find().populate('clicks');
        return res.send(users);
    }
};

