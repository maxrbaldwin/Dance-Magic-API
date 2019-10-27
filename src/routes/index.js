const Router = require('express').Router();
const { parse: parseUrl } = require('url');
const bodyParser = require('body-parser');
const { log } = require('@logging');
const { serverError, invalidJSON } = require('@utils/responses');

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
  const body = req.body ? JSON.stringify(req.body) : {};
  const { pathname } = parseUrl(req.url);
  const message = `route: ${pathname} : body: ${body}`;
  log(level, message);
  next();
});
// All Routes
Router.use('/', require('@routes/home'));
Router.use('/api/contact', require('@routes/contact'));

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
    res.status(400).json({ error: res.locals.error });
    return;
  }
  res.status(500).json({ error: serverError.code })
})

module.exports = Router;
