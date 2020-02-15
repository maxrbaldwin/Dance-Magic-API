const isProduction = require('@utils/isProduction');

const getTimeStamp = () => {
  const currentdate = new Date();
  
  const datetime = `${currentdate.getMonth() + 1}/${currentdate.getDate()}/${currentdate.getFullYear()}@${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;

  return datetime;
};

const withTimestamp = (level, message) => `[${level}] : ${getTimeStamp()} : ${message}`;
const withErrorObject = (message, err) => `${message} : ${err}`;

function logErrorDev(level, message) {
  console.error(withTimestamp(level, message));
}

function logDev(level, message) {
  console.log(withTimestamp(level, message));
}

const loggerMap = {
  dev: logDev,
  production: logDev,
  test: () => {},
}

module.exports = {
  log: loggerMap[process.env.NODE_ENV],
  logError: logErrorDev,
  withErrorObject,
};
