const hashCode = str => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

const intToRGB = i => {
  const c = (i & 0x00ffffff).toString(16).toUpperCase()

  return '00000'.substring(0, 6 - c.length) + c
}

export default name =>
  intToRGB(hashCode(name))
    .match(/(..?)/g)
    .map(value => parseInt(value, 16))
