const { decryptEnvironment } = require('dance-magic/packages/environment');
const { log } = require('@logging');

const serverEnvVars = [
  'HOST',
  'PROJECT_ID',
  'RECAPTCHA_SERVER',
  'EMAIL_SERVER',
  'EMAIL_USER',
  'EMAIL_PASSWORD',
];

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const envVars = await decryptEnvironment(serverEnvVars);
      for (let index = 0; index < envVars.length; index++) {
        const { key, value } = envVars[index]
        process.env[key] = value
      }
      resolve()
    } catch(err) {
      log('error', `Error setting env vars: ${err}`)
      reject(err)
    }
  });
}