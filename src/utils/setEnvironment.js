const { fetchEnvironmentVariables } = require('@db');
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
      const envVars = await fetchEnvironmentVariables();
      envVars.forEach(env => {
        const { key, value } = env;
        if (serverEnvVars.indexOf(key) > -1) {
          process.env[key] = value;
        }
      })
      resolve()
    } catch(err) {
      log('error', `Error setting env vars: ${err}`)
      reject(err)
    }
  });
}