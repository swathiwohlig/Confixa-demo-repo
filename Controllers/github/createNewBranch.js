const express = require('express')
const router = express.Router()
// const authenticateAndAuthorise = require('../../middlewares/auth/authenticateAndAuthorise')
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const createNewBranches = require('../../services/createNewBranches/createNewBranches')

const validationSchema = {
  type: 'object',
  required: true,
  properties: {
    ref: {
        type: 'string',
        required: true
    },
    sha: {
        type: 'string',
        required: true
    }
  },
  additionalProperties: false
}

const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'body')
}

const createNewBranch = async (req, res) => {
  try {
    // console.log('branches-->',req.body)
    // console.log('branches-->',req.headers)
    const createNewBranch = await createNewBranches(req.body,req.headers.authorization)
    res.sendJson({
      type: __constants.RESPONSE_MESSAGES.SUCCESS,
      data: createNewBranch
    })
  } catch (err) {
    console.log('createDepartment err 61 :: ', err)
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}

router.post('/createNewBranch', validation, createNewBranch)
module.exports = router
