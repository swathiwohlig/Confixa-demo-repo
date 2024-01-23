const Pool = require('../../lib/db/postgres').pool
const queries = require('../../queries/usersDetails/getAllUsers')

const getAllUsers = async (data) => {
  try {
    // Fetch paginated active org
    data.search = data.search || ''
    // Total Count
    console.log(data.search, 'data.search')
    // const allUsers = await Pool.query(queries.getDataCount(data))
    // const totalCount = parseInt(allUsers.rows[0].count)

    // filteredCount
    const totalUsers = await Pool.query(queries.getAllUsers(data))
    const filteredCount = totalUsers.rowCount
    return {
      // totalCount,
      filteredCount,
      data: totalUsers.rows
    }
  } catch (error) {
    console.log('getAllUsers error 26 ', error)
    throw new Error('Error in getting users: ' + error.message)
  }
}

module.exports = getAllUsers
