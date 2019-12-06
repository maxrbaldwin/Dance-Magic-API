require('module-alias/register');

const express = require('express');
const cors = require('cors');
const setEnvironment = require('@utils/setEnvironment');
const { log } = require('@logging');

const app = express();
const PORT = process.env.PORT || 9000;

// handle cors
app.use(cors());
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