const Pool = require('../../lib/db/postgres').pool
const queries = require('../../queries/usersDetails/deleteUser')
const __constants = require('../../config/constants')

const RemoveUser = async (data) => {
  console.log(data)
  try {
    const changeUser = await Pool.query(queries.changeUserStatus(data))
    console.log(JSON.stringify(changeUser))
    if (changeUser.rowCount > 0) {
      return __constants.RESPONSE_MESSAGES.USER_DELETE
    }
  } catch (error) {
    console.log('error RemoveUser 12 :: ', error)
    throw new Error('Error in deleting user: ' + error.message)
  }
}

module.exports = RemoveUser
