export default (number = 0, precision = 2) => {
  if (isNaN(number)) return number

  const [integerSection, decimalSection] = parseFloat(number).toFixed(precision).split('.')
  const integerSectionFormated = integerSection.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  if (!decimalSection) return integerSectionFormated

  return `${integerSectionFormated}.${decimalSection}`
}
