export default (value) => {
  let average = value
  if (typeof average === 'string') {
    average = parseFloat(average)
  }

  return average ? average.toFixed(2) : 0
}
