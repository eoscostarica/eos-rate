const { hasuraUtil } = require('../utils')
const { get, countLikes } = require('./comment_like.service')

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

const update = async payload => {
  const mutation = `
      mutation ( $transaction: String!, $total_like: Int!, $total_dislike: Int!) {
        update_comment_by_pk(pk_columns: {transaction: $transaction}, _set: {total_like: $total_like, total_dislike: $total_dislike}) {
          total_like
          total_dislike
        }
      }
    `

  return await hasuraUtil.instance.request(mutation, { ...payload })
}
const updatelike = async payload => {
  const likes = await get(
    {
      transaction: { _eq: payload.comment_transaction }
    },
    true
  )

  if (!likes) {
    return
  }

  const total_like = await countLikes({
    like: { _eq: true }
  })
  const total_dislike = await countLikes({
    like: { _eq: false }
  })

  await update({
    transaction: payload.comment_transaction,
    total_like: total_like.aggregate.count,
    total_dislike: total_dislike.aggregate.count
  })
}

module.exports = { save, updatelike }
