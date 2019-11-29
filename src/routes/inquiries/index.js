const Router = require('express').Router();

// API inquiries route
Router.use('/delete', (req, res) => {
  res.send('inquires');
});

Router.get('/delete', (req, res) => {
  res.send('inquires');
});

Router.get('/manage', (req, res) => {

});

module.exports = Router;