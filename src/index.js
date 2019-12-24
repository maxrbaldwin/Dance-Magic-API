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

app.listen(PORT, async () => {
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