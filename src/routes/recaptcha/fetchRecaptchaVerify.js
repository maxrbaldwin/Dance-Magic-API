
const axios = require('axios')
const log = require('@logging')

const isTest = process.env.NODE_ENV === 'test';
const testData = {
  data: {
    success: true,
    score: 0.9,
  }
}

const url = 'https://www.google.com/recaptcha/api/siteverify'
const logLevel = 'error'

const getRecaptchaVerifyEndpoint = (recaptchaSecret, recaptchaToken, remoteip) => `${url}?secret=${recaptchaSecret}&response=${recaptchaToken}&remoteip=${remoteip}`

const fetchRecaptchaVerify = (recaptchaToken, remoteip) => {
  const recaptchaSecret = process.env.RECAPTCHA_SERVER 
  return new Promise(async (resolve, reject) => {
    const url = getRecaptchaVerifyEndpoint(recaptchaSecret, recaptchaToken, remoteip)
    try {
      const response = await axios.post(url)
      return resolve(response)
    } catch (err) {
      log(logLevel, 'error in verifying captcha request')
      return reject(err)
    }
  })
}

const mockRecaptchaVerify = () => Promise.resolve(testData)

module.exports = isTest ? mockRecaptchaVerify : fetchRecaptchaVerify