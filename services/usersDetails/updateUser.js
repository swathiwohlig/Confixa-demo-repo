const Pool = require('../../lib/db/postgres').pool
const queries = require('../../queries/usersDetails/updateUser')
const __constants = require('../../config/constants')

const UpdateUsers = async (data) => {
  try {
    const changeUserDetails = await Pool.query(queries.updateUser(data))
    if (changeUserDetails.rowCount > 0) {
      return __constants.RESPONSE_MESSAGES.USER_UPDATAED
    }
  } catch (error) {
    console.log('error UpdateUsers 12 :: ', error)
    throw new Error('Error in updating user: ' + error.message)
  }
}

module.exports = UpdateUsers
