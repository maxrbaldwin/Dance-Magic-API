require('module-alias/register');

const express = require('express');
const cors = require('cors');
const { log } = require('@logging');

const app = express();
const PORT = process.env.PORT || 9000;

// handle cors
app.use(cors());
// configure all routes
app.use('/', require('@routes'));

app.listen(PORT, () => {
  const level = 'app';
  const message = `Server started. Listening on port ${PORT}`;
  log(level, message);
});
// for tests
module.exports = app;