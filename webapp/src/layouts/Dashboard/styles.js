export default (theme, drawerWidth) => ({
  root: {
    display: 'flex',
    minHeight: '100vh'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    overflow: 'hidden',
    height: '100vh'
  },
  childContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    border: '3px solid red',
    paddingTop: theme.spacing(2),
    overflow: 'scroll'
  }
})
