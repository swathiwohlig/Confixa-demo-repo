const express = require('express')
const router = express.Router()
// const authenticateAndAuthorise = require('../../middlewares/auth/authenticateAndAuthorise')
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const editFile = require('../../services/editFile/editFile')

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
    sha: { 
        type:'string',
        required:true
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

const editNewFile = async (req, res) => {
  try {
    console.log('branches-->',req.body)
    console.log('branches-->',req.headers)
    const editNewFile = await editFile(req.body,req.headers.authorization)
    res.sendJson({
      type: __constants.RESPONSE_MESSAGES.SUCCESS,
      data: editNewFile
    })
  } catch (err) {
    console.log('Edit the file :: ', err)
    return res.sendJson({
      type: err.type || __constants.RESPONSE_MESSAGES.SERVER_ERROR,
      err: err.err || err
    })
  }
}

router.post('/edit', validation, editNewFile)
module.exports = router
