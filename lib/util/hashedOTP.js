const crypto = require('crypto')
const authConfig = require('../../config').authentication

module.exports = (password) => {
  return crypto.createHmac('sha512', authConfig.hashingSecret).update(password).digest('hex')
}
