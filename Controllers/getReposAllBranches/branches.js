const express = require('express')
const router = express.Router()
// const authenticateAndAuthorise = require('../../middlewares/auth/authenticateAndAuthorise')
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const createNewUser = require('../../services/usersDetails/create')

const validationSchema = {
  type: 'object',
  required: true,
  properties: {
    token: {
      type: 'string',
      required: true
    }
    }
}

const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'params')
}

const getAllBranches = async (req, res) => {
  try {
    const DeptData = await createNewUser({
      ...req.body
    })
    res.sendJson({
      type: __constants.RESPONSE_MESSAGES.SUCCESS,
      data: DeptData
    })
  } catch (err) {
    console.log('error in getting all branches   :: ', err)
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}

router.post('/getAllBranches', validation, getAllBranches)
module.exports = router
