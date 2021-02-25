const validateNumber = (average) => {
  const value = average.toFixed(2)

  if (value % 1 === 0) return parseInt(value)

  return value
}

export default (value) => {
  let average = value

  if (typeof average === 'string') {
    average = parseFloat(average)
  }

  return average ? validateNumber(average) : 0
}
