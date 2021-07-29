export default (theme) => ({
  root: {
    padding: theme.spacing(3),
    '& img': {
      width: '35px !important'
    },
    '& h4': {
      fontSize: '15px !important',
      fontWeight: '600'
    },
    '& a': {
      lineBreak: 'anywhere'
    },
    [theme.breakpoints.up('sm')]: {
      '& img': {
        width: '45px !important'
      },

      '& h4': {
        fontSize: '34px !important',
        fontWeight: 'normal'
      }
    }
  }
})
