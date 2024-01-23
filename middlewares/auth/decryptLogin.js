const decrypt = require('../../lib/util/decrypt')
const __constants = require('../../config/constants')
const __config = require('../../config')

module.exports = async (req, res, next) => {
  if (!__config.authentication.encryptionInit) return next()
  try {
    const { email = '' } = req.body
    if (email) {
      const decryptEmail = decrypt(email)
      req.body.email = decryptEmail
    }
    next()
  } catch (err) {
    console.log(err, 'err')
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}
