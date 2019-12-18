require('module-alias/register');
require('dotenv').config({ path: './env/.env' });

const express = require('express');
const cors = require('cors');
const { log } = require('@logging');

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
  log(level, message);
})
// for tests
module.exports = app;