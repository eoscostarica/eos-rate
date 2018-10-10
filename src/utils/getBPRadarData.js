import getColorFromName from 'utils/getColorFromName'

export default ({ producer_account_name: name, parameters }) => {
  const colors = getColorFromName(name)

  return {
    label: name,
    backgroundColor: `rgba(${colors.join(', ')}, 0.2)`,
    borderColor: `rgba(${colors.join(', ')}, 1)`,
    pointBackgroundColor: `rgba(${colors.join(', ')}, 1)`,
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: `rgba(${colors.join(', ')}, 1)`,
    data: Object.values(parameters)
  }
}
