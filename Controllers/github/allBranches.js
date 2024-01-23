const express = require('express')
const router = express.Router()
// const authenticateAndAuthorise = require('../../middlewares/auth/authenticateAndAuthorise')
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const createNewUser = require('../../services/usersDetails/create')
const getAllBranches = require('../../services/getReposAllBranches/branches')

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
  },
  additionalProperties: false
}

const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'body')
}

const createUserDetails = async (req, res) => {
  try {
    const branches = await getAllBranches(req.headers.authorization)
    console.log(req.headers)
    res.sendJson({
      type: __constants.RESPONSE_MESSAGES.SUCCESS,
      data: branches
    })
  } catch (err) {
    console.log('createDepartment err 61 :: ', err)
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}

router.get('/branches', validation, createUserDetails)
module.exports = router
