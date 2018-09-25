export default blockProducers =>
  blockProducers.map(({ name, colors, values }) => ({
    label: name,
    backgroundColor: `rgba(${colors.join(', ')}, 0.2)`,
    borderColor: `rgba(${colors.join(', ')}, 1)`,
    pointBackgroundColor: `rgba(${colors.join(', ')}, 1)`,
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: `rgba(${colors.join(', ')}, 1)`,
    data: values
  }))
