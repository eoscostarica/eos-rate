const Boom = require('@hapi/boom')
const Joi = require('joi')

const { ratesStatsService } = require('../services')

module.exports = {
  method: 'POST',
  path: '/get-rates-stats',
  handler: async ({ payload: { input } }) => {
    try {
      if (!input) throw new Error('Invalid get-rates-stats Input')

      const whereCondition = input?.ratesStatsInput?.bps
        ? { _in: input?.ratesStatsInput?.bps }
        : { _nin: [] }
      const bpsStats = await ratesStatsService.getRatesStats({
        where: { bp: whereCondition }
      })

      return { bpsStats }
    } catch (error) {
      console.error('get-rates-stats', error)

      return Boom.badRequest(error.message)
    }
  },
  options: {
    validate: {
      payload: Joi.object({
        input: Joi.object({
          ratesStatsInput: Joi.object({
            bps: Joi.array().items(Joi.string().required()).optional()
          }).required()
        }).required()
      }).options({ stripUnknown: true })
    },
    auth: 'simple'
  }
}
