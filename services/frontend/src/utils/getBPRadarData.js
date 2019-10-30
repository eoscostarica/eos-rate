import radarPalette from 'config/radar-color-palette'
import getRgbColorsFromHex from 'utils/getRgbColorsFromHex'

export default ({ name, parameters }) => {
  const randomColor =
    radarPalette[Math.floor(Math.random() * radarPalette.length)]
  const colors = getRgbColorsFromHex(randomColor)

  return {
    label: name,
    lineTension: 0.3,
    borderJoinStyle: 'round',
    backgroundColor: `rgba(${colors.join(', ')}, .6)`,
    borderColor: `rgba(${colors.join(', ')}, .6)`,
    pointBackgroundColor: `rgba(${colors.join(', ')}, .6)`,
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: `rgba(${colors.join(', ')}, 1)`,
    data: Object.values(parameters)
  }
}
