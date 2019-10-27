const path = require('path');
const isProduction = require('@utils/isProduction');
// const Logging = require('@google-cloud/logging');
// const { ErrorReporting } = require('@google-cloud/error-reporting');

// const projectId = 'nyt-addfpmonitor-dev';
// const keyFilename = path.join(__dirname, '../../', 'credentials/serviceAccount.json');

const getTimeStamp = () => {
  const currentdate = new Date();
  
  const datetime = `${currentdate.getMonth() + 1}/${currentdate.getDate()}/${currentdate.getFullYear()}@${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;

  return datetime;
};

const getLogging = () => {}
  // new Logging({
  //   projectId,
  // });
const getErrorReporting = () => {}
  // new ErrorReporting({
  //   projectId,
  //   keyFilename,
  // });

const logging = isProduction() ? getLogging() : {};
const errors = isProduction() ? getErrorReporting() : {};

const withTimestamp = (level, message) => `[${level}] : ${getTimeStamp()} : ${message}`;
const withErrorObject = (message, err) => `${message} : ${err}`;

function logError(level, message) {
  errors.report(withTimestamp(level, message));
}

function logErrorDev(level, message) {
  console.error(withTimestamp(level, message));
}

async function log(level, message, type = 'global') {
  const logName = 'general';
  const writeTo = logging.log(logName);
  const text = withTimestamp(level, message);
  const metadata = { resource: { type } };
  const entry = writeTo.entry(metadata, text);

  await log.write(entry).catch(err => {
    logError(err);
  });
}

function logDev(level, message) {
  console.log(withTimestamp(level, message));
}

const loggerMap = {
  dev: logDev,
  production: log,
  test: () => {},
}

module.exports = {
  log: loggerMap[process.env.NODE_ENV],
  logError: isProduction() ? logError : logErrorDev,
  withErrorObject,
};
