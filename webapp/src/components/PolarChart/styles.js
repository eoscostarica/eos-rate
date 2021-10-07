export default theme => ({
  highchartsFigure: {
    margin: 0,
    width: '100% !important',
    '& .highcharts-container ': {
      margin: 0,
      [theme.breakpoints.down('md')]: {
        margin: 0,
        width: '100% !important'
      }
    }
  }
})
