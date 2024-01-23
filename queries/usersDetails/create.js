
const queries = {
  insertNewUser: (data) => {
    const fields = Object.keys(data)
    const placeholders = fields
      .map((field, index) => `$${index + 1}`)
      .join(', ')

    return {
      text: `INSERT INTO "users_details" (${fields
              .map((field) => `"${field}"`)
              .join(', ')}) VALUES (${placeholders}) RETURNING *`,
      values: fields.map((field) => data[field])
    }
  },
  checkUserAlreadyExists: (GitId) => ({
    text: 'SELECT * FROM "users_details" WHERE  git_id = $1',
    values: [GitId]
  })
}

module.exports = queries
