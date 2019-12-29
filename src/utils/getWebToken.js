const jwt = require('jsonwebtoken');

const getWebToken = (user, signature) => {
  const options = {
    expiresIn: '40d'
  }
  return jwt.sign({ user }, signature, options);
}

module.exports = getWebToken