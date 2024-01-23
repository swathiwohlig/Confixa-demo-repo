const express = require('express')
const router = express.Router()
// const authenticateAndAuthorise = require('../../middlewares/auth/authenticateAndAuthorise')
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const getAllUsers = require('../../services/usersDetails/getAllUsers')

/**
 * @namespace -DEPT-MODULE-
 * @description API’s related to DEPT module.
 */

/**
 * @memberof DEPT-module
 * @email create
 * @path {GET} /api/department/getAllDepartment
 * @description Bussiness Logic :- In login API, we get all departments from db.
 * @response {string} ContentType=application/json - Response content type.
 * @response {string} metadata.msg=Success  - Response got successfully.
 * @response {string} metadata.data - It will return the data.
 * @code {200} if the msg is success the api returns the data.
 * @author hafiz shaikh, 22th November 2023
 * *** Last-Updated :- hafiz shaikh, 20th November 2023 ***
 */

const validationSchema = {
  type: 'object',
  required: true,
  properties: {
    search: {
      type: 'string'
    }
  },
  additionalProperties: false
}

const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'query')
}

const getUsers = async (req, res) => {
  try {
    const userData = await getAllUsers({
      ...req.query
    })
    console.log('------->', userData)
    res.sendJson({
      type: __constants.RESPONSE_MESSAGES.SUCCESS,
      data: userData
    })
  } catch (err) {
    console.log('getAllUsers err 53 :: ', err)
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}

router.post('/getAllUsers', validation, getUsers)
module.exports = router
