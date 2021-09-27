import getRgbColorsFromHex from './get-rgb-colors-from-hex'

export default ({ name, parameters }) => {
  const { r, g, b } = getRgbColorsFromHex(name)

  return {
    // label: name,
    name,
    type: 'area',
    // lineTension: 0.3,
    // borderJoinStyle: 'round',
    // backgroundColor: `rgba(${r}, ${g}, ${b}, .6)`,
    // borderColor: `rgba(${r}, ${g}, ${b}, .6)`,
    color: `rgba(${r}, ${g}, ${b}, .6)`,
    // pointBorderColor: '#fff',
    // pointHoverBackgroundColor: '#fff',
    // pointHoverBorderColor: `rgba(${r}, ${g}, ${b}, 1)`,
    data: Object.values(parameters)
  }
}
