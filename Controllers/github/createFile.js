const express = require('express')
const router = express.Router()
// const authenticateAndAuthorise = require('../../middlewares/auth/authenticateAndAuthorise')
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const createFile = require('../../services/createFile/createFile')

const validationSchema = {
  type: 'object',
  required: true,
  properties: {
    message: {
        type: 'string',
        required: true
    },
    content: {
        type: 'string',
        required: true
    },
    branch: {
        type: 'string',
        required: true
    }
  },
  additionalProperties: false
}

const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'body')
}

const createNewFile = async (req, res) => {
  try {
    console.log('branches-->',req.body)
    console.log('branches-->',req.headers)
    const createNewFile = await createFile(req.body,req.headers.authorization)
    res.sendJson({
      type: __constants.RESPONSE_MESSAGES.SUCCESS,
      data: createNewFile
    })
  } catch (err) {
    console.log('createDepartment err 61 :: ', err)
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}

router.post('/create', validation, createNewFile)
module.exports = router
