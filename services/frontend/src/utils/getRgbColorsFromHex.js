const getColorHashByString = (inputString = 'defaultString') => {
  let inputStringSum = 0

  for (const i in inputString) {
    inputStringSum += inputString.charCodeAt(i)
  }

  const r = ~~(
    ('0.' +
      Math.sin(inputStringSum + 1)
        .toString()
        .substr(6)) *
    256
  )
  const g = ~~(
    ('0.' +
      Math.sin(inputStringSum + 2)
        .toString()
        .substr(6)) *
    256
  )
  const b = ~~(
    ('0.' +
      Math.sin(inputStringSum + 3)
        .toString()
        .substr(6)) *
    256
  )

  const rgb = `rgb(${r}, ${g}, ${b})`
  const hex = `#${r.toString(16)}${g.toString(16)}${b.toString(
    16
  )}`.toUpperCase()

  return { r, g, b, rgb, hex }
}

export default getColorHashByString
