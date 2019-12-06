const { fetchEnvironmentVariables } = require('@db');
const { log } = require('@logging');

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const envVars = await fetchEnvironmentVariables();
      envVars.forEach(env => {
        const { key, value } = env;
        process.env[key] = value;
      })
      resolve()
    } catch(err) {
      log('error', `Error setting env vars: ${err}`)
      reject(err)
    }
  });
}