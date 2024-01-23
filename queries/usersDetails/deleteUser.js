const queries = {
  changeUserStatus: (data) => (
    {
      text: 'DELETE FROM "users_details" WHERE git_id = $1',
      values: [data.git_id]
    })
}

module.exports = queries
