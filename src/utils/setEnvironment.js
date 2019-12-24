const { fetchEnvironmentVariables } = require('@db');
const { decrypt } = require('@tools/encrypt');
const { log } = require('@logging');

const keyring = 'environment';
const keyName = 'secrets';

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
      const envVars = await fetchEnvironmentVariables();
      const root = envVars.results;
      for (let index = 0; index < root.length; index++) {
        const { key, value } = root[index]
        const decryptedValue = await decrypt(value, keyring, keyName)
        if (serverEnvVars.indexOf(key) > -1) {
          process.env[key] = decryptedValue.plaintext.toString();
        }
      }
      resolve()
    } catch(err) {
      log('error', `Error setting env vars: ${err}`)
      reject(err)
    }
  });
}