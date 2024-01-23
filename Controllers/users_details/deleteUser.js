const express = require('express')
const router = express.Router()
// const authenticateAndAuthorise = require('../../middlewares/auth/authenticateAndAuthorise')
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const deleteUser = require('../../services/usersDetails/deleteUser')

/**
 * @namespace -User-MODULE-
 * @description API’s related to User module.
 */

/**
 * @memberof -User-module-
 * @email login
 * @path {GET} /api/Users/createUser
 * @description Bussiness Logic :- In User API, create user.
 * @response {string} ContentType=application/json - Response content type.
 * @response {string} metadata.msg=Success  - Response got successfully.
 * @response {string} metadata.data - It will return the data.
 * @code {200} if the msg is success the api returns data.
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
    }
  }
}

const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'body')
}

const deleteSingleUser = async (req, res) => {
  try {
    const updatedBy = req?.user?.id || null
    const userExists = await deleteUser({
      ...req.body,
      updated_by: updatedBy,
      updated_on: new Date()
    })
    res.sendJson({
      type: __constants.RESPONSE_MESSAGES.SUCCESS,
      data: userExists
    })
  } catch (err) {
    console.log('deleteSingleUser err 55 :: ', err)
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}

router.post('/deleteUser', validation, deleteSingleUser)
module.exports = router
