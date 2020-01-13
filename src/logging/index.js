const path = require('path');
const isProduction = require('@utils/isProduction');
const { Logging } = require('@google-cloud/logging');
const { ErrorReporting } = require('@google-cloud/error-reporting');

const projectId = process.env.PROJECT_ID

const getTimeStamp = () => {
  const currentdate = new Date();
  
  const datetime = `${currentdate.getMonth() + 1}/${currentdate.getDate()}/${currentdate.getFullYear()}@${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;

  return datetime;
};

const getLogging = () => new Logging({
  projectId,
});
const getErrorReporting = () => new ErrorReporting({
  projectId,
});

const logging = isProduction() ? getLogging() : {};
const errors = isProduction() ? getErrorReporting() : {};

const withTimestamp = (level, message) => `[${level}] : ${getTimeStamp()} : ${message}`;
const withErrorObject = (message, err) => `${message} : ${err}`;

function logError(level, message) {
  const text = withTimestamp(level, message)
  logErrorDev(level, message)
  errors.report(text);
}

function logErrorDev(level, message) {
  console.error(withTimestamp(level, message));
}

async function log(level, message, type = 'global') {
  const logName = 'app';
  const writeTo = logging.log(logName);
  const text = withTimestamp(level, message);
  const metadata = { resource: { type } };
  const entry = writeTo.entry(metadata, text);

  logDev(level, message)

  await writeTo.write(entry).catch(err => {
    logError('error', err);
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
  log: loggerMap['production'],
  logError: isProduction() ? logError : logErrorDev,
  withErrorObject,
};
