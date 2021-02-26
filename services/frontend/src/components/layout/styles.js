export default (theme) => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    width: '100%'
  },
  desktopDrawer: {
    width: 240,
    transition: 'width 225ms cubic-bezier(0, 0, 0.2, 1) 0ms'
  },
  desktopDrawerHidden: {
    width: 0
  },
  toolbar: theme.mixins.toolbar,
  content: {
    overflow: 'auto',
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    position: 'relative'
  },
  contentWrapper: {
    minHeight: 'calc(100vh - 128px)'
  }
})
