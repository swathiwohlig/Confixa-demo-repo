const moment = require('moment')
const __constants = require('../../config/constants')
const __db = require('../../lib/db')

function Lockout () {
  return null
}

Lockout.initialize = async (req, res, next) => {
  const _lockout = this instanceof Lockout ? this : lockout
  const reqIp = req?.body?.email_id_1
  const expiryInSeconds = __constants.REQUEST_LOCKOUT_IN_SECONDS || 900

  if (!reqIp) {
    return res.sendJson({
      type: __constants.RESPONSE_MESSAGES.INVALID_REQUEST,
      err: 'Please Turn Off The IP Vanisher Software Before Accessing The Application'
    })
  }
  const requestDetails = await __db.redis.get(reqIp)
  if (!requestDetails) {
    const options = {
      reqIp: reqIp,
      total_tries: 0,
      failed: 0
    }
    await __db.redis.setex(reqIp, JSON.stringify(options), expiryInSeconds)
    req.requestDetails = options
    return next()
  }
  req.requestDetails = JSON.parse(requestDetails)

  if (req.requestDetails.failed && req.requestDetails.failed >= 3) {
    const ttl = await __db.redis.get_ttl(reqIp)
    const time = moment.utc(ttl * 1000).format('mm:ss')
    if (ttl < 900) {
      _lockout.increseFailure(req) // this piece of code will reset the timer every time the user tries to login in again
    }
    return res.sendJson({
      type: __constants.RESPONSE_MESSAGES.INVALID_REQUEST,
      err: `You Have Been Locked Out Please Try After ${
        time ? time + ' Minutes' : 'A While'
      }`
    })
  }
  next()
}

Lockout.increseFailure = async (req) => {
  console.log('before invalid requestDetails 56 ::', req.requestDetails)
  const requestDetails = req?.requestDetails
  const expiryInSeconds = __constants.REQUEST_LOCKOUT_IN_SECONDS || 900
  requestDetails.total_tries += 1
  requestDetails.failed += 1
  console.log('after invalid requestDetails 61 :: ', requestDetails)
  await __db.redis.setex(
    requestDetails.reqIp,
    JSON.stringify(requestDetails),
    expiryInSeconds
  )
}

Lockout.increseTries = async (req) => {
  const requestDetails = req?.requestDetails
  const expiryInSeconds = __constants.REQUEST_LOCKOUT_IN_SECONDS || 900
  requestDetails.total_tries += 1
  await __db.redis.setex(
    requestDetails.reqIp,
    JSON.stringify(requestDetails),
    expiryInSeconds
  )
}

Lockout.reset = async (req) => {
  const reqIp = req?.body?.email_id_1
  const expiryInSeconds = __constants.REQUEST_LOCKOUT_IN_SECONDS || 900
  const options = {
    reqIp: reqIp,
    total_tries: 0,
    failed: 0,
    employeeId: req?.body?.email_id_1 || ''
  }
  await __db.redis.setex(reqIp, JSON.stringify(options), expiryInSeconds)
}

Lockout.resetEmployeeId = async (employeeId) => {
  const expiryInSeconds = __constants.REQUEST_LOCKOUT_IN_SECONDS || 900
  const options = {
    reqIp: employeeId,
    total_tries: 0,
    failed: 0
  }
  await __db.redis.setex(employeeId, JSON.stringify(options), expiryInSeconds)
}

const lockout = (module.exports = exports = Lockout)
