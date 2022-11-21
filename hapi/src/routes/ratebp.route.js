const Boom = require('@hapi/boom')
const Joi = require('joi')

const {
  updateBpStatsUtil,
  updateUserRatingUtil,
  validateAccountNameUtil
} = require('../utils')

module.exports = {
  method: 'POST',
  path: '/ratebp',
  handler: async ({ payload: { input } }) => {
    try {
      if (!input) throw new Error('Invalid ratebp Input')

      const {
        ratingInput: { user, producer, transaction, isEden }
      } = input
      const isValidAccountName = validateAccountNameUtil([
        { name: user, type: 'user account' },
        { name: producer, type: 'block producer' }
      ])

      if (!isValidAccountName.isValidAccountName)
        throw new Error(isValidAccountName.message)

      const { edenResult, totalStats } = await updateBpStatsUtil(producer)
      const result = await updateUserRatingUtil(
        user,
        producer,
        transaction,
        isEden
      )

      return { resultEden: edenResult, totalStats, ...result }
    } catch (error) {
      console.error('ratebp', error)

      return Boom.badRequest(error.message)
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        input: Joi.object({
          ratingInput: Joi.object({
            user: Joi.string().required(),
            isEden: Joi.boolean().required(),
            producer: Joi.string().required(),
            transaction: Joi.object().required()
          }).required()
        }).required()
      }).options({ stripUnknown: true })
    }
  }
}
