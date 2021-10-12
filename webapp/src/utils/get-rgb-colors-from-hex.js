const stc = require('string-to-color')

const getColorHashByString = (inputString = 'defaultString') => {
  const color = stc(inputString)
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color)
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  const rgb = `rgb(${r}, ${g}, ${b})`
  const hex = `${color}`.toUpperCase()

  return { r, g, b, rgb, hex }
}

export default getColorHashByString
