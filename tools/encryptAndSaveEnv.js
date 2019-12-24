require('module-alias/register');

const { encrypt } = require('@tools/encrypt');
const { fetchEnvironmentVariables, saveEnvironmentalVariables } = require('@db');

const keyring = 'environment';
const keyName = 'secrets';

async function encryptAndSaveEnv() {
  let envVars = { results: [], symbol: '' };
  try {
    envVars = await fetchEnvironmentVariables()
  } catch (err) {
    console.log('Error fetching env vars: ', err);
    throw err;
  }

  let encryptedEnvVars = []
  try {
    const root = envVars.results
    const symbol = envVars.symbol
    for (let index = 0; index < root.length; index++) {
      const { key, value } = root[index]
      const encryptedData = await encrypt(value, keyring, keyName);
      encryptedEnvVars.push({ key, value: encryptedData, path: root[index][symbol].path })
    }
  } catch (err) {
    console.log('Error encrypting env vars: ', err);
    throw err;
  }

  try {
    for (let index = 0; index < encryptedEnvVars.length; index++) {
      const { key, value, path } = encryptedEnvVars[index];
      if (!value) return
      await saveEnvironmentalVariables(key, value, path)
    }
  } catch (err) {
    console.log('Error saving env vars after encryption: ', err);
    throw err;
  }
}

Promise.resolve().then(encryptAndSaveEnv).catch(err => {
  console.log('Error encrypting and saving environmental variables: ', err);
})