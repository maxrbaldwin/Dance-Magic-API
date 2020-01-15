const Router = require('express').Router();
const { decryptObject } = require('dance-magic/packages/encryption')
const emitter = require('@emitter');
const { noRef, fetchRefFailed, failedSaveOnResolve, invalidApiKey, decryptionFailed, noUserFound } = require('@utils/responses');
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
    res.locals.error = noUserFound;
    next(noRef)
  } else if (resolved === true) {
    res.status(200).send('already resolved');
  } else {
    next();
  }
})
// decrypt body
Router.use('/resolve', async (req, res, next) => {
  const keyring = 'db'
  const key = 'users'
  const { name, email } = res.locals.contact
  try {
    const decryptedResult = await decryptObject({ name, email }, keyring, key)
    res.locals.template = decryptedResult
    next()
  } catch(err) {
    res.locals.error = decryptionFailed
    next(decryptionFailed)
  }
})
// set resolve true
Router.get('/resolve', async (req, res) => {
  const contact = res.locals.contact
  const template = res.locals.template
  try {
    const resolvedContact = resolveContact(contact);
    const resolveMessage = getResolveMessage(template);
    await saveInquiry(resolvedContact);
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