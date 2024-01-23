const jwt = require('jsonwebtoken')
const authConfig = require('../../config').authentication

module.exports = {
  // Path: lib/util/jwt_mgmt.js
  // verify the jwt token and return all the data in it
  verifyToken: async (token) => {
    return new Promise((resolve) => {
      jwt.verify(token, authConfig.jwtSecretKey, (error, data) => {
        if(error) return resolve({error: error + "", data: null})
        return resolve({data: data, error: null})
      })
    })
  },
  // sign jwt token and return the token and expiry in seconds
  signToken: async (data) => {
    return jwt.sign({ data }, authConfig.jwtSecretKey, { expiresIn: authConfig.jwtExpiry })
  }
}