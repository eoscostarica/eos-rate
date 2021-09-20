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
    flex: 1,
    height: '100%',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(1),
    overflow: 'scroll'
  }
})
