const Router = require('express').Router();
const fetchRecaptchaVerify = require('@routes/recaptcha/fetchRecaptchaVerify');
const {
  invalidRecaptchaToken,
  recaptchaVerifyError,
  recaptchaValidationFailed,
  recaptchaInvalidUser
} = require('@utils/responses');

const goodScore = 0.5;

Router.post('/', (req, res, next) => {
  const recaptchaToken = req.body.token;
  if (!recaptchaToken) {
    res.locals.error = invalidRecaptchaToken
    next(invalidRecaptchaToken)
  } else {
    next()
  }
})

Router.post('/', async (req, res, next) => {
  try {
    // secret, token, ip address
    const response = await fetchRecaptchaVerify(req.body.token, req.id)
    res.locals.recaptchaResponse = response.data
    next();
  } catch (err) {
    console.log(err);
    res.locals.error = recaptchaVerifyError
    next(recaptchaVerifyError)
  }
})

Router.post('/', (req, res, next) => {
  const { success, score } = res.locals.recaptchaResponse
  const isGoodScore = score > goodScore
  if (success) {
    res.locals.isValidUser = isGoodScore
    next()
  } else {
    res.locals.error = recaptchaValidationFailed
    next(recaptchaValidationFailed)
  }
})

Router.post('/', (req, res, next) => {
  const isValidUser = res.locals.isValidUser
  if (!isValidUser) {
    res.locals.error = recaptchaInvalidUser
    next(recaptchaInvalidUser)
  } else {
    next()
  }
})

module.exports = Router