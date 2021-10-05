export default theme => ({
  highchartsFigure: {
    margin: '1em auto',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto',
      width: '100% !important'
    },
    '& .highcharts-container ': {
      margin: '1em auto',
      [theme.breakpoints.down('md')]: {
        margin: '0 auto',
        width: '100% !important'
      }

      // height: '400px !important',
      // width: '350px !important',
      // border: '2px dashed purple',

      // '& > svg': {
      //   fill: '#94d31b',
      //   height: '400px !important',
      //   width: '350px !important'
      // },

      // [theme.breakpoints.up('sm')]: {
      //   border: '2px solid green',
      //   height: '400px !important',
      //   width: '600px !important',
      //   '& > svg': {
      //     fill: '#94d31b',
      //     height: '400px !important',
      //     width: '600px !important'
      //   }
      // },
      // [theme.breakpoints.up('md')]: {
      //   border: '2px solid blue',
      //   height: '400px !important',
      //   width: '400px !important',
      //   '& > svg': {
      //     fill: '#94d31b',
      //     height: '400px !important',
      //     width: '450px !important'
      //   }
      // },
      // [theme.breakpoints.up('lg')]: {
      //   border: '2px solid orange'
      // }
    }
  }
})
