const __constants = require('../../config/constants')
const jwtManagement = require('../../lib/util/jwt_mgmt')
const getUserFromCache = require('../../services/auth/getUserFromCache')
/**
 * a functionality to verify decode token and set check all the permissions
 * @param {[string]} requiredPermissions an array of required permissions
 * @example ['app:read:create', 'app:write:create']
 * @param {[string]} optionalPermissions an array if optional permissions to set optional flags
 * @example ['app:read:create', 'app:write:create']
 * @returns {Promise<object>}
 */
module.exports = (requiredPermissions, optionalPermissions) => {
  return async function (req, res, next) {
    const { authorization } = req.headers
    if (!authorization) {
      return res.sendJson({
        type: __constants.RESPONSE_MESSAGES.NOT_AUTHORIZED,
        err: 'Unauthorized'
      })
    }
    // verify the jwt token and get the user id from it
    let { data = null, error = null } = await jwtManagement.verifyToken(
      authorization
    )
    if (error) {
      return res.sendJson({
        type: __constants.RESPONSE_MESSAGES.NOT_AUTHORIZED,
        err: error
      })
    }
    if (!data || !data.data) {
      return res.sendJson({
        type: __constants.RESPONSE_MESSAGES.NOT_AUTHORIZED,
        err: 'Unauthorized'
      })
    }
    data = data.data
    const cachePresent = await getUserFromCache(data.email_id_1)
    if (!cachePresent) {
      return res.sendJson({
        type: __constants.RESPONSE_MESSAGES.NOT_AUTHORIZED,
        err: 'Unauthorized'
      })
    }

    if (!cachePresent) {
      return res.sendJson({
        type: __constants.RESPONSE_MESSAGES.NOT_AUTHORIZED,
        err: 'Unauthorized'
      })
    }
    if (requiredPermissions.indexOf(data.role_id) < 0) {
      return res.sendJson({
        type: __constants.RESPONSE_MESSAGES.NOT_AUTHORIZED,
        err: 'Unauthorized'
      })
    }

    req.user = data
    next()
  }
}
