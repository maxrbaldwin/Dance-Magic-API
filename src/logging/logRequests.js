const Router = require('express').Router();
const { parse: parseUrl } = require('url');
const { log } = require('@logging');

// log all requests
Router.use((req, res, next) => {
  const level = 'req';
  const { pathname } = parseUrl(req.url);
  const message = `route: ${pathname}`;
  log(level, message);
  next();
});

module.exports = Router;