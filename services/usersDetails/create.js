const Pool = require('../../lib/db/postgres').pool
const queries = require('../../queries/usersDetails/create')
const __constants = require('../../config/constants')

const createNewUser = async (data) => {
  try {
    const checkUserExits = await Pool.query(
      queries.checkUserAlreadyExists(data.git_id)
    )
    if (checkUserExits.rows[0]) {
      return __constants.RESPONSE_MESSAGES.USER_EXIST
    }
    await Pool.query(queries.insertNewUser(data))
    return __constants.RESPONSE_MESSAGES.USER_ADDED
  } catch (error) {
    console.log('error createNewUser 16 :: ', error)
    const resData = {}
    resData.data = __constants.RESPONSE_MESSAGES.USER_ADD_FAILED
    resData.error = error
    return resData
    // throw new Error('Error in creating new user : ' + error.message)
  }
}
module.exports = createNewUser
