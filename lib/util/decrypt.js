const __auth = require('../../config').authentication
const crypto = require("crypto")
module.exports = (str) => {
  const algorithm = 'aes-256-cbc'
  const decipher = crypto.createDecipheriv(
    algorithm,
    __auth.cipherKey,
    __auth.cipherIV
  )
  let decryptedData = decipher.update(str, 'base64', 'utf-8')
  decryptedData += decipher.final('utf8')
  return decryptedData
}
