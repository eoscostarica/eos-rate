/**
 * All this functionality should move into the BE project
 */

const TIMESTAMP_EPOCH = 946684800

const castToNumber = value => (!isNaN(Number(value)) ? value / 1 : 0)

export default votes => {
  const date = Date.now() / 1000 - TIMESTAMP_EPOCH
  const weight = date / (86400 * 7) / 52 // 86400 = seconds per day 24*3600
  return castToNumber(votes) / 2 ** weight / 10000
}
