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
    }
  };