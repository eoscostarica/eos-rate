export default theme => ({
  wrapperContainers: {
    color: '#433F5B',
    padding: theme.spacing(6, 2),
    maxWidth: 1024,
    width: '100%',
    '& h6': {
      marginBottom: theme.spacing(1)
    },
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(6, 4)
    }
  },
  firstContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.surface.main,
    '& h5': {
      fontSize: theme.typography.h4.fontSize,
      marginBottom: 12.5
    }
  },
  middleContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: theme.palette.surface.main,
    '& img': {
      width: '100%'
    }
  },
  lastContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  }
})
