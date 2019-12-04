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
      message: 'message no user reference provided',
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
    }
  };