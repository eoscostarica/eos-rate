import getRgbColorsFromHex from './get-rgb-colors-from-hex'

export default ({ colorString, name, parameters, visible = true }) => {
  const { r, g, b, hex } = getRgbColorsFromHex(colorString)

  return {
    name,
    type: 'area',
    color: `rgba(${r}, ${g}, ${b}, .6)`,
    colorHex: hex,
    data: Object.values(parameters),
    visible
  }
}
