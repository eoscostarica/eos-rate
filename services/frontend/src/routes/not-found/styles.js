export default (theme) => ({
  root: {
    width: '100%',
    height: 'calc(100vh - 128px)',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  container: {
    margin: theme.spacing(2),
    height: '100%',
    width: '50%',
    background: theme.palette.primary.sectionBackground,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& > *': {
      marginTop: theme.spacing(4)
    }
  },
  graphic: {
    borderRadius: '50%',
    background: theme.palette.primary.dark,
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '200px',
    height: '200px',
    '& > span': {
      fontWeight: '600',
      lineHeight: 1
    },
    '& > span:first-child': {
      fontSize: '4rem'
    },
    '& > span:nth-child(2)': {
      fontSize: '1.8rem'
    }
  }
})
