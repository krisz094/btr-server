const before24hMod = 24 * 60 * 60 * 1000; //hour minute sec millisec

const getDateOfNthLastDay = n => +new Date() - n * before24hMod;

const getEntityMadeBetweenPrevNthDays = async function (Entity, smaller, bigger, additionalCriteria = {}) {
  return await Entity.count({
    ...additionalCriteria,
    createdAt: { '<=': getDateOfNthLastDay(smaller), '>=': getDateOfNthLastDay(bigger) }
  });
}

const getLastWeekStatsByDayForEntity = async function (Entity, additionalCriteria) {
  const entityDays = [];
  for (let i = 0; i < 7; i++) {
    entityDays.unshift(await getEntityMadeBetweenPrevNthDays(Entity, i, i + 1, additionalCriteria));
  }
  return await entityDays;
}

const getPreviousWeekCountForEntity = async function (Entity, additionalCriteria) {
  return await getEntityMadeBetweenPrevNthDays(Entity, 7, 14, additionalCriteria);
}

const getBasicPropsForEntity = async function (Entity, suffix, additionalCriteria = {}) {
  const obj = {};
  obj[`all${suffix}`] = await Entity.count(additionalCriteria);
  obj[`last7Days${suffix}`] = await getLastWeekStatsByDayForEntity(Entity, additionalCriteria);
  obj[`previousWeek${suffix}`] = await getPreviousWeekCountForEntity(Entity, additionalCriteria);
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
  const basicStats = await getBasicPropsForEntity(Muser, 'RegisteredUsers');
  return Object.assign({}, basicStats);
}

const getInvestmentStats = async function () {
  const basicStats = await getBasicPropsForEntity(Investmentlog, 'PurchasedInvestments');
  return Object.assign({}, basicStats);

}

const getGamblingStats = async function () {
  const basicStats = await getBasicPropsForEntity(Gamblinglog, 'Gambles');
  const wonStats = await getBasicPropsForEntity(Gamblinglog, 'GamblesWon' ,{ gamblingWon: true });
  return Object.assign({}, basicStats, wonStats);

}

const getUpgradeStats = async function () {
  const basicStats = await getBasicPropsForEntity(Upgradelog, 'PurchasedUpgrades');
  return Object.assign({}, basicStats);
}

const getPieChartStats = async function () {
  const gamblingMoney = await Statslog.sum('moneyFromGambling');
  const clicksMoney = await Statslog.sum('moneyFromClicks');
  const videosMoney = await Statslog.sum('moneyFromVideos');
  const investmentsMoney = await Statslog.sum('moneyFromInvestments');
  return {
    gamblingMoney,
    clicksMoney,
    videosMoney,
    investmentsMoney
  }
}

const getPlaytimeStats = async function () {
  const videosWatched = await Statslog.sum('videosWatched');
  const achievementsUnlocked = await Statslog.sum('achievementsUnlocked');
  const currentPlaytime = await Statslog.sum('currentPlaytime');
  return {
    videosWatched,
    achievementsUnlocked,
    currentPlaytime
  }
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
    const pieChartStats = await getPieChartStats();
    const playtimeStats = await getPlaytimeStats();
    Object.assign(sendData, pinglogStats);
    Object.assign(sendData, muserStats);
    Object.assign(sendData, investmentStats);
    Object.assign(sendData, gamblingStats);
    Object.assign(sendData, upgradeStats);
    Object.assign(sendData, pieChartStats);
    Object.assign(sendData, playtimeStats);

    return exits.success(sendData);

  }


};
