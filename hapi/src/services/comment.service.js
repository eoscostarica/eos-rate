const { hasuraUtil } = require('../utils')

const save = async payload => {
  const mutation = `
    mutation ($payload: comment_insert_input!) {
        insert_comment_one(object: $payload) {
            created_at
        }
    }
`

  const data = await hasuraUtil.instance.request(mutation, { payload })

  return data.insert_comment_one
}

module.exports = { save }
