const Router = require('express').Router();
const emitter = require('@emitter');
const { noRef, fetchRefFailed, failedSaveOnResolve, invalidApiKey } = require('@utils/responses');
const { resolveContact, getResolveMessage } = require('@routes/inquiries/resolveContact');
const { fetchByRef, saveInquiry } = require('@db');

// API inquiries route
// Check to see if ref exists in query string
Router.use('/resolve', (req, res, next) => {
  if (!req.query.ref) {
    res.locals.error = noRef;
    next(noRef);
  } else {
    next();
  }
});
// check to see if ref exists in db
Router.use('/resolve', async (req, res, next) => {
  const ref = req.query.ref;
  try {
    const result = await fetchByRef(ref);
    res.locals.contact = result;
    next();
  } catch(err) {
    res.locals.error = fetchRefFailed;
    next(fetchRefFailed);
  }
});
// check to make sure we found something and it isn't resolved
Router.use('/resolve', (req, res, next) => {
  const { ref, email, resolved } = res.locals.contact
  if (!ref || !email) {
    res.locals.error = noRef;
    next(noRef)
  } else if (resolved === true) {
    res.status(200).send('already resolved');
  } else {
    next();
  }
})
// set resolve true
Router.get('/resolve', async (req, res) => {
  try {
    const resolvedContact = resolveContact(res.locals.contact);
    const result = await saveInquiry(resolvedContact);
    const resolveMessage = getResolveMessage(result.data);
    res.status(200).send(resolveMessage);
  } catch(err) {
    res.locals.error = failedSaveOnResolve;
    next(failedSaveOnResolve);
  }
});
// cron. get inquiries with resolve true
// see if when is greater than or equal to time + 30 days in ms
Router.get('/manage', async (req, res, next) => {
  // if api key is correct....
  if (true) {
    next();
  } else {
    next(invalidApiKey);
  }
});
Router.get('/manage', async (req, res) => {
  emitter.emit('manageInquiries');
  res.status(200).send('all good');
});

module.exports = Router;