const express = require('express')
const router = express.Router()
// const authenticateAndAuthorise = require('../../middlewares/auth/authenticateAndAuthorise')
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const createNewUser = require('../../services/usersDetails/create')

/**
 * @path {GET} /api/user_details/addNewUser
 * @description Bussiness Logic :- In this API, we will add User
 * @response {string} ContentType=application/json - Response content type.
 * @response {string} metadata.msg=Success  - Response got successfully.
 * @response {string} metadata.data - It will return the data.
 * @code {200} if the msg is success the api returns the data.
 * @author Swathi Cherala, 17th January 2024
 * *** Last-Updated :- Swathi Cherala, 17th January 2024 ***
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
    },
    created_on: {
      type: 'number'
    },
    created_by: {
      type: 'string'
    },
    updated_on: {
      type: 'number'
    },
    updated_by: {
      type: 'string'
    }
  },
  additionalProperties: false
}

const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'body')
}

const createUserDetails = async (req, res) => {
  try {
    const DeptData = await createNewUser({
      ...req.body,
      created_by: req?.user?.id || null,
      updated_by: req?.user?.id || null,
      created_on: new Date(),
      updated_on: new Date()
    })
    res.sendJson({
      type: __constants.RESPONSE_MESSAGES.SUCCESS,
      data: DeptData
    })
  } catch (err) {
    console.log('createDepartment err 61 :: ', err)
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}

router.post('/addNewUser', validation, createUserDetails)
module.exports = router
