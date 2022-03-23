const { hasuraUtil } = require('../utils')

const get = async (where, getMany = false) => {
  const query = `
      query ($where: comment_like_bool_exp!) {
        comment_like(where: $where, order_by: {created_at: desc}) {
          id
          user
          transaction
          like
          comment_transaction
          created_at
        }
      }
    `

  const { comment_like } = await hasuraUtil.instance.request(query, { where })

  return getMany ? comment_like : comment_like[0]
}

const save = async payload => {
  const mutation = `
    mutation ($payload: comment_like_insert_input!) {
        insert_comment_like_one(object: $payload) {
            created_at
        }
    }
`

  const data = await hasuraUtil.instance.request(mutation, { payload })

  return data.insert_comment_like_one
}

const update = async payload => {
  const mutation = `
      mutation ($id: Int!, $transaction: String!, $like: Boolean!) {
        update_comment_like_by_pk(pk_columns: {id: $id}, _set: {transaction: $transaction, like: $like}) {
          updated_at
        }
      }
    `

  return await hasuraUtil.instance.request(mutation, { ...payload })
}

const countLikes = async where => {
  const query = `
      query ($where: comment_like_bool_exp!) {
        comment_like_aggregate(where: $where) {
          aggregate {
            count
          }
        }
      }
    `
  const { comment_like_aggregate } = await hasuraUtil.instance.request(query, {
    where
  })
  return comment_like_aggregate
}

const saveOrUpdate = async payload => {
  const like = await get({
    comment_transaction: { _eq: payload.comment_transaction },
    user: { _eq: payload.user }
  })

  if (!like) {
    await save(payload)

    return
  }

  await update({
    id: like.id,
    transaction: payload.transaction,
    like: payload.like
  })
}

module.exports = { saveOrUpdate, get, countLikes }
