const Router = require('express').Router();

// API home route
Router.get('/', (req, res) => {
  res.send('phone home');
});

module.exports = Router;