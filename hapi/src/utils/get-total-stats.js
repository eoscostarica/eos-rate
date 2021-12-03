const calculateTotalStats = ({
  firstAverage,
  secondAverage,
  fieldsAmount,
  firstCounter,
  secondCounter
}) => {
  const dividend =
    firstAverage * (firstCounter * fieldsAmount) +
    secondAverage * (secondCounter * fieldsAmount)
  const divider = (firstCounter + secondCounter) * fieldsAmount
  return dividend / divider
}

const getTotalStats = ({ producerData, edenStats, statsAmount, oneStat }) => {
  const average = calculateTotalStats({
    firstAverage: producerData.average || 0,
    secondAverage: edenStats.average || 0,
    firstCounter: producerData.ratings_cntr || 0,
    secondCounter: edenStats.ratings_cntr || 0,
    fieldsAmount: statsAmount
  })

  const community = calculateTotalStats({
    firstAverage: producerData.community || 0,
    secondAverage: edenStats.community || 0,
    firstCounter: producerData.ratings_cntr || 0,
    secondCounter: edenStats.ratings_cntr || 0,
    fieldsAmount: oneStat
  })

  const development = calculateTotalStats({
    firstAverage: producerData.development || 0,
    secondAverage: edenStats.development || 0,
    firstCounter: producerData.ratings_cntr || 0,
    secondCounter: edenStats.ratings_cntr || 0,
    fieldsAmount: oneStat
  })

  const infrastructure = calculateTotalStats({
    firstAverage: producerData.infrastructure || 0,
    secondAverage: edenStats.infrastructure || 0,
    firstCounter: producerData.ratings_cntr || 0,
    secondCounter: edenStats.ratings_cntr || 0,
    fieldsAmount: oneStat
  })

  const trustiness = calculateTotalStats({
    firstAverage: producerData.trustiness || 0,
    secondAverage: edenStats.trustiness || 0,
    firstCounter: producerData.ratings_cntr || 0,
    secondCounter: edenStats.ratings_cntr || 0,
    fieldsAmount: oneStat
  })

  const transparency = calculateTotalStats({
    firstAverage: producerData.trustiness || 0,
    secondAverage: edenStats.trustiness || 0,
    firstCounter: producerData.ratings_cntr || 0,
    secondCounter: edenStats.ratings_cntr || 0,
    fieldsAmount: oneStat || 0
  })

  return {
    average,
    ratings_cntr:
      (producerData.ratings_cntr || 0) + (edenStats.ratings_cntr || 0),
    community,
    development,
    infrastructure,
    trustiness,
    transparency
  }
}

module.exports = getTotalStats
