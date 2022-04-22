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

const updateUserRating = async payload => {
  const mutation = `
    mutation ($bp: String!, $user: String!, $id_bc_rating: Int!) {
      update_user_ratings(where: {bp: {_eq: $bp}, user: {_eq: $user}}, _set: {id_bc_rating: $id_bc_rating}) {
        affected_rows
      }
    }
  `

  const data = await hasuraUtil.instance.request(mutation, { ...payload })

  return data.update_user_ratings
}

const update = async payload => {
  const mutation = `
      mutation ( $rating_id: Int!, $total_like: Int!, $total_dislike: Int!) {
        update_comment(where: {rating_id: {_eq: $rating_id}}, _set: {total_like: $total_like, total_dislike: $total_dislike}) {
          returning {
            total_like
            total_dislike
          }
        }
      }
    `

  return await hasuraUtil.instance.request(mutation, { ...payload })
}
const updatelike = async payload => {
  const total_like = await countLikes({
    like: { _eq: true },
    rating_id: { _eq: payload.rating_id }
  })
  const total_dislike = await countLikes({
    like: { _eq: false },
    rating_id: { _eq: payload.rating_id }
  })

  await update({
    rating_id: payload.rating_id,
    total_like: total_like.aggregate.count,
    total_dislike: total_dislike.aggregate.count
  })
}

module.exports = { save, updatelike, updateUserRating }
