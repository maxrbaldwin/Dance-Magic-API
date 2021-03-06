require('module-alias/register');

const express = require('express');
const cors = require('cors');
const { log } = require('@logging');
const logRequests = require('@logging/logRequests');
const corsOptions = require('@utils/corsOptions');

const app = express();
const PORT = process.env.PORT || 9000;

// handle cors
app.use(cors(corsOptions));
// enable preflight check for all routes
app.options('*', cors(corsOptions))
// log all request
app.use(logRequests)
// to get user's ip address
app.set('trust proxy', true)
// set event listeners
app.use(require('@emitter'));
// configure all routes
app.use('/', require('@routes'));
// https://stackoverflow.com/questions/42283599/node-server-running-but-localhost-refusing-to-connect
app.listen(PORT, '0.0.0.0', async () => {
  const level = 'app';
  const message = `Server started. Listening on port ${PORT}`;
  log(level, message);
}).on('error', err => {
  log('error', `error starting app: ${err}`);
})
// for tests
module.exports = app;