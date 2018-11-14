const before24hMod = 24 * 60 * 60 * 1000; //hour minute sec millisec

const getDateOfNthLastDay = n => +new Date() - n * before24hMod;

const getEntityMadeBetweenPrevNthDays = async function (Entity, smaller, bigger) {
  return await Entity.count({ createdAt: { '<=': getDateOfNthLastDay(smaller), '>=': getDateOfNthLastDay(bigger) } });
}

const getLastWeekStatsByDayForEntity = async function (Entity) {
  const entityDays = [];
  for (let i = 0; i < 7; i++) {
    entityDays.unshift(await getEntityMadeBetweenPrevNthDays(Entity, i, i + 1));
  }
  return await entityDays;
}

const getPreviousWeekCountForEntity = async function (Entity) {
  return await getEntityMadeBetweenPrevNthDays(Entity, 7, 14);
}

const getBasicPropsForEntity = async function (Entity, suffix) {
  const obj = {};
  obj[`all${suffix}`] = await Entity.count();
  obj[`last7Days${suffix}`] = await getLastWeekStatsByDayForEntity(Entity);
  obj[`previousWeek${suffix}`] = await getPreviousWeekCountForEntity(Entity);
  return obj;
}


const getPinglogStats = async function () {
  const last7DaysOpens = [];
  const last7DaysCloses = []
  for (let i = 0; i < 7; i++) {
    const dayOpens = await Pinglog.count({
      action: 'open',
      createdAt: { '<=': getDateOfNthLastDay(i), '>=': getDateOfNthLastDay(i + 1) }
    });
    const dayCloses = await Pinglog.count({
      action: 'close',
      createdAt: { '<=': getDateOfNthLastDay(i), '>=': getDateOfNthLastDay(i + 1) }
    });
    last7DaysOpens.unshift(dayOpens);
    last7DaysCloses.unshift(dayCloses);
  }
  return {
    allTimeOpens: await Pinglog.count({ action: 'open' }),
    allTimeCloses: await Pinglog.count({ action: 'close' }),
    previousWeekOpens: await Pinglog.count({ action: 'open', createdAt: { '<=': getDateOfNthLastDay(7), '>=': getDateOfNthLastDay(14) } }),
    previousWeekCloses: await Pinglog.count({ action: 'close', createdAt: { '<=': getDateOfNthLastDay(7), '>=': getDateOfNthLastDay(14) } }),
    last7DaysCloses,
    last7DaysOpens
  }
}

const getMuserStats = async function () {
  return await getBasicPropsForEntity(Muser, 'RegisteredUsers');
}

const getInvestmentStats = async function () {
  return await getBasicPropsForEntity(Investmentlog, 'PurchasedInvestments');
}

const getGamblingStats = async function () {
  return await getBasicPropsForEntity(Gamblinglog, 'Gambles');
}

const getUpgradeStats = async function() {
  return await getBasicPropsForEntity(Upgradelog, 'PurchasedUpgrades');
}

module.exports = {


  friendlyName: 'View welcome page',


  description: 'Display the dashboard "Welcome" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/dashboard/welcome',
      description: 'Display the welcome page for authenticated users.'
    },

  },


  fn: async function (inputs, exits) {
    let sendData = {};

    const pinglogStats = await getPinglogStats();
    const muserStats = await getMuserStats();
    const investmentStats = await getInvestmentStats();
    const gamblingStats = await getGamblingStats();
    const upgradeStats = await getUpgradeStats();
    Object.assign(sendData, pinglogStats);
    Object.assign(sendData, muserStats);
    Object.assign(sendData, investmentStats);
    Object.assign(sendData, gamblingStats);
    Object.assign(sendData, upgradeStats);

    return exits.success(sendData);

  }


};
