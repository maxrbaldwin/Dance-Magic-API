module.exports = {
  serverError: {
    code: 0,
    message: 'server error',
  },
  invalidParameters: {
    code: 1, 
    message: 'invalid parameters',
  },
  withValidationErrors: validationErrorMessages => ({
    code: 3,
    message: validationErrorMessages,
  }),
  invalidJSON: {
    code: 4,
    message: 'invalid JSON provided',
  },
  noRef: {
    code: 5,
    message: 'no user reference provided',
  },
  fetchRefFailed: {
    code: 6,
    message: 'failed to fetch by ref',
  },
  failedSaveOnResolve: {
    code: 8,
    message: 'failed to save after resolving. not resolved',
  },
  invalidApiKey: {
    code: 9,
    message: 'invalid api key from cron',
  },
  invalidRecaptchaToken: {
    code: 10,
    message: 'invalid recaptcha token'
  },
  recaptchaVerifyError: {
    code: 11,
    message: 'verifying recaptcha threw an error'
  },
  recaptchaValidationFailed: {
    code: 12,
    message: 'verifying recaptcha was not successful. token invalid'
  },
  recaptchaInvalidUser: {
    code: 13,
    message: 'recaptcha says this is not a valid user'
  },
  successResponse: {
    code: 14,
    message: 'form submitted successfully'
  },
  decryptionFailed: {
    code: 15,
    message: 'error decrypting data'
  },
  noUserFound: {
    code: 16,
    message: 'no user found to resolve'
  }
};