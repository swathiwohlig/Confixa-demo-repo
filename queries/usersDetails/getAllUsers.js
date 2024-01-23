const queries = {
  getAllUsers: (data) => {
    const query = 'SELECT * FROM "users_details"'
    const queryFilter = `WHERE  (git_id::text ILIKE $1)
        ORDER BY users_details.created_on DESC `
    return {
      text: query + queryFilter,
      values: [`%${data.search}%`]
      // text: query,
      // values: []
    }
  },
  getDataCount: (data) => {
    const query = `select count(ud.*)   
        from users_details ud`
    return {
      text: query,
      values: [data.git_id]
    }
  }
}
module.exports = queries
