const express = require('express')
const router = express.Router()
// const authenticateAndAuthorise = require('../../middlewares/auth/authenticateAndAuthorise')
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const createNewRepo = require('../../services/createNewRepo/createNewRepo')

const validationSchema = {
  type: 'object',
  required: true,
  properties: {
    name: {
        type: 'string',
        required: true
    },
    private: {
        type: Boolean,
        required: true
    },
    auto_init: {
        type: Boolean,
        required: true
    }
  },
  additionalProperties: false
}

const validation = (req, res, next) => {
  return validationOfAPI(req, res, next, validationSchema, 'body')
}

const createNewRepos = async (req, res) => {
  try {
    console.log('ok-->',req.body)
    console.log('hmm-->',req.headers.authorization)
    const createNewRepos = await createNewRepo(req.body,req.headers.authorization)
    res.sendJson({
      type: __constants.RESPONSE_MESSAGES.SUCCESS,
      data: createNewRepos
    })
  } catch (err) {
    console.log('createDepartment err 61 :: ', err)
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}

router.post('/createNewRepo', validation, createNewRepos)
module.exports = router
