import getRgbColorsFromHex from './get-rgb-colors-from-hex'

export default ({ colorString, name, parameters, visible = true }) => {
  const { r, g, b } = getRgbColorsFromHex(colorString)

  return {
    name,
    type: 'area',
    color: `rgba(${r}, ${g}, ${b}, .6)`,
    data: Object.values(parameters),
    visible
  }
}
