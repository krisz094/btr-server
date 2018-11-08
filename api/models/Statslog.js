/**
 * Statslog.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝

    currentMoney: { type: 'number', required: true },
    currentClicks: { type: 'number', required: true },
    currentPlaytime: { type: 'number', required: true },

    totalMoneyCollected: { type: 'number', required: true },
    totalMoneySpent: { type: 'number', required: true },
    totalInvestmentLevels: { type: 'number', required: true },
    upgradesBought: { type: 'number', required: true },

    moneyFromVideos: { type: 'number', required: true },
    moneyFromGambling: { type: 'number', required: true },
    moneyFromClicks: { type: 'number', required: true },
    moneyFromInvestments: { type: 'number', required: true },

    highestMoney: { type: 'number', required: true },
    videosWatched: { type: 'number', required: true },
    achievementsUnlocked: { type: 'number', required: true },
    moneySpentGambling: { type: 'number', required: true },
    gamblingBalance: { type: 'number', required: true },

    updatedAt: false,

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝
    user: {
      model: 'muser'
    }
  },

};

