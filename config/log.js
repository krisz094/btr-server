/**
 * Built-in Log Configuration
 * (sails.config.log)
 *
 * Configure the log level for your app, as well as the transport
 * (Underneath the covers, Sails uses Winston for logging, which
 * allows for some pretty neat custom transports/adapters for log messages)
 *
 * For more information on the Sails logger, check out:
 * https://sailsjs.com/docs/concepts/logging
 */

const winston = require('winston');
const format = winston.format;
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: format.simple(),
      level: 'debug'
    }),
    new winston.transports.File({
      filename: 'combined.log',
      format: format.simple(),
      level: 'warn'
    })
  ]
});

class logTranslate {
  error(msg) {
    logger.error(msg);
  }
  warn(msg) {
    logger.warn(msg);
  }
  info(msg) {
    logger.info(msg);
  }
  verbose(msg) {
    logger.verbose(msg);
  }
  debug(msg) {
    logger.debug(msg);
  }
  silly(msg) {
    logger.silly(msg);
  }
  log(msg) {
    logger.debug(msg);
  }
}

const tran = new logTranslate();

module.exports.log = {

  /***************************************************************************
  *                                                                          *
  * Valid `level` configs: i.e. the minimum log level to capture with        *
  * sails.log.*()                                                            *
  *                                                                          *
  * The order of precedence for log levels from lowest to highest is:        *
  * silly, verbose, info, debug, warn, error                                 *
  *                                                                          *
  * You may also set the level to "silent" to suppress all logs.             *
  *                                                                          *
  ***************************************************************************/

  /* // Pass in our custom logger, and pass all log levels through.
  custom: tran,
  level: 'silly',

  // Disable captain's log so it doesn't prefix or stringify our meta data.
  inspect: false */

};
