require('module-alias/register');

const express = require('express');
const cors = require('cors');
const { log } = require('@logging');
const setEnvironment = require('@utils/setEnvironment');

const app = express();
const PORT = process.env.PORT || 9000;

// to get user's ip address
app.set('trust proxy', true)
// handle cors
app.use(cors());
// set event listeners
app.use(require('@emitter'));
// configure all routes
app.use('/', require('@routes'));
// https://stackoverflow.com/questions/42283599/node-server-running-but-localhost-refusing-to-connect
app.listen(PORT, '0.0.0.0', async () => {
  const level = 'app';
  const message = `Server started. Listening on port ${PORT}`;
  try {
    await setEnvironment();
  } catch (err) {
    log('error', `error setting env vars: ${err}`);
  }
  log(level, message);
}).on('error', err => {
  log('error', `error starting app: ${err}`);
})
// for tests
module.exports = app;