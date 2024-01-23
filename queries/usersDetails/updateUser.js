const queries = {
  updateUser: (data) => {
    const updateFields = Object.keys(data).filter((key) => key !== 'git_id')
    return {
      text: `UPDATE "users_details" SET ${updateFields
          .map((field, index) => `"${field}" = $${index + 2}`)
          .join(', ')} WHERE git_id = $1`,
      values: [data.git_id, ...updateFields.map((field) => data[field])]
    }
  }
}

module.exports = queries
