const express = require('express')
const router = express.Router()
// const authenticateAndAuthorise = require('../../middlewares/auth/authenticateAndAuthorise')
const __constants = require('../../config/constants')
const validationOfAPI = require('../../middlewares/validation')
const createNewUser = require('../../services/usersDetails/create')
const getAllRepos = require('../../services/getReposAllBranches/branches')

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

const getAllRepo = async (req, res) => {
  try {
    const branches = await getAllRepos(req.headers.authorization)
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

router.get('/allRepos', validation, getAllRepo)
module.exports = router
