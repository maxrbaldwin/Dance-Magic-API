const Router = require('express').Router();
const { parse: parseUrl } = require('url');
const bodyParser = require('body-parser');
const { log } = require('@logging');
const { serverError, invalidJSON } = require('@utils/responses');

// routes
const home = require('@routes/home')
const healthCheck = require('@routes/health')
const contact = require('@routes/contact');
const inquiries = require('@routes/inquiries')
const recaptcha = require('@routes/recaptcha')

// configure the body parser
Router.use(bodyParser.json());
Router.use(bodyParser.urlencoded({ extended: false }));
// handle invalid json body
Router.use(function (error, req, res, next) {
  if (error) {
    res.locals.error = invalidJSON;
    next(invalidJSON.message);
  } else {
    next();
  }
});

// log all requests
Router.use((req, res, next) => {
  const level = 'req';
  const { pathname } = parseUrl(req.url);
  const message = `route: ${pathname}`;
  log(level, message);
  next();
});
// All Routes
Router.use('/', home)
Router.use('/.health', healthCheck)
// order  matters here. recaptcha should come before contact to validate request
Router.use('/api/contact', recaptcha)
Router.use('/api/contact', contact)
Router.use('/api/inquiries', inquiries)

// middleware to handle 404s
Router.use((req, res, next) => {
  if (res.locals.error) {
    next();
  }
  res.status(404).send('Route does not exist');
});

// log errors
Router.use(function (err, req, res, next) {
  if (res.locals.error) {
    const level = 'res';
    const message = res.locals.error ? JSON.stringify(res.locals.error) : {};
    log(level, message);
    res.status(400).json({ ...res.locals.error });
    return;
  }
  log('error', JSON.stringify(err));
  res.status(500).json({ ...serverError })
})

module.exports = Router;
