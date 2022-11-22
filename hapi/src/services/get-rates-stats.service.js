const { hasuraUtil } = require('../utils')

const getRatesStats = async ({ where }) => {
  const query = `
    query ($where: total_ratings_stats_bool_exp!) {
        total_ratings_stats(where: $where) {
            average
            bp
            community
            development
            infrastructure
            ratings_cntr
            transparency
            trustiness
          }
    }
  `
  const data = await hasuraUtil.instance.request(query, { where })

  return data?.total_ratings_stats || [{}]
}

module.exports = {
  getRatesStats
}
