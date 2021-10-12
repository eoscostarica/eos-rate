import getRgbColorsFromHex from './get-rgb-colors-from-hex'

export default ({ name, parameters }) => {
  const { r, g, b } = getRgbColorsFromHex(name)

  return {
    name,
    type: 'area',
    color: `rgba(${r}, ${g}, ${b}, .6)`,
    data: Object.values(parameters)
  }
}
