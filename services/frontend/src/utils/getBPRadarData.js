import getColorFromName from 'utils/getColorFromName'

export default ({ name, parameters }) => {
  const colors = getColorFromName(name)

  return {
    label: name,
    lineTension: 0.3,
    borderJoinStyle: 'round',
    backgroundColor: `rgba(${colors.join(', ')}, .9)`,
    borderColor: `rgba(${colors.join(', ')}, 1)`,
    pointBackgroundColor: `rgba(${colors.join(', ')}, 1)`,
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: `rgba(${colors.join(', ')}, 1)`,
    data: Object.values(parameters)
  }
}
