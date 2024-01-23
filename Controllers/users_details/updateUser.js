const express = require('express')
const router = express.Router()
// const authenticateAndAuthorise = require("../../middlewares/auth/authenticateAndAuthorise");
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const UpdateUser = require('../../services/usersDetails/updateUser')

/**
 * @namespace -User-MODULE-
 * @description API’s related to AUTH module.
 */

/**
 * @memberof -auth-module-
 * @email login
 * @path {GET} /api/Users/updateUser
 * @description Bussiness Logic :- In login API, we get all the roleses from db.
 * @response {string} ContentType=application/json - Response content type.
 * @response {string} metadata.msg=Success  - Response got successfully.
 * @response {string} metadata.data - It will return the data.
 * @code {200} if the msg is success the api returns the token (roles token).
 * @author hafiz shaikh, 20th November 2023
 * *** Last-Updated :- hafiz shaikh, 20th November 2023 ***
 */

const validationSchema = {
  type: 'object',
  required: true,
  properties: {
    git_id: {
      type: 'string',
      required: true
    },
    access_token: {
      type: 'string',
      required: true
    }
  }
}

const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'body')
}

const updateUserDetails = async (req, res) => {
  try {
    console.log('-=---->updateDate')
    const updatedBy = req?.user?.id || null
    const userExists = await UpdateUser({
      ...req.body,
      updated_by: updatedBy,
      updated_on: new Date()
    })
    res.sendJson({
      type: __constants.RESPONSE_MESSAGES.SUCCESS,
      data: userExists
    })
  } catch (err) {
    console.log('updateUserDetails err 108 :: ', err)
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}

router.post(
  '/updateUser',
  validation,
  updateUserDetails
)
module.exports = router
