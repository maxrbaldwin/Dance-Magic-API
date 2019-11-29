const Router = require('express').Router();
const { body, validationResult } = require('express-validator');
const { withValidationErrors } = require('@utils/responses');
const emitter = require('@emitter');

/*
  @Routes /api/contact 
  - Order matters
  - Check required params goes first because an error in phone validation would trip that error message
*/

const getValidationErrors = errorsArray => {
  return errorsArray.map(error => error.msg).toString();
}
// body('name').isAlpha().not().isEmpty().withMessage('Letters only. No numbers or characters'),
// Check required params
Router.use('/', [
  body('name').custom(name => {
    const nameRegex = RegExp('^[a-zA-Z ]*$');
    if (name === undefined || name.length === 0) {
      throw new Error('Name is required');
    }

    if (!nameRegex.test(name)) {
      throw new Error('Letters only. No numbers or special characters');
    }
    return true;
  }),
  body('email').isEmail().withMessage('Must be a valid email'),
  body('email').not().isEmpty().withMessage('Must provide email'),
  body('message').not().isEmpty().trim().escape().withMessage('Must have message'),
], (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length) {    
    const validationErrorMessages = getValidationErrors(errors);
    res.locals.error = withValidationErrors(validationErrorMessages);
    next(validationErrorMessages);
  } else {    
    next();
  }
});

// checks phone number. is not required
Router.use('/', [
  body('phone').isMobilePhone().withMessage('Must be valid phone number'),
], (req, res, next) => {
  const { errors } = validationResult(req);
  if (errors.length) {
    const phoneErrorValues = errors[0];
    const phoneValue = phoneErrorValues.value;
    // invalid format
    if (phoneValue !== undefined) {
      res.locals.error = withValidationErrors(phoneErrorValues.msg);
      next(phoneErrorValues.msg);
    // no phone number given
    } else {
      next();
    }
    // valid number given
  } else {
    next();
  }
});
// Response 200
Router.post('/', (req, res) => {
  emitter.emit('sendFollowUp', req.body)
  emitter.emit('sendInquiry', req.body)
  res.status(200).send('all good')
});

module.exports = Router;