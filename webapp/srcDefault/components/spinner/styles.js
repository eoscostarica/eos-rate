export default theme => ({
  blockContainer: {
    '&:focus': {
      outline: 'none'
    },
    bottom: 0,
    cursor: 'wait',
    height: '100%',
    left: 0,
    overflow: 'hidden',
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: 99999
  },
  blockOverlay: {
    backgroundColor: '#fff',
    height: '100%',
    opacity: 0.3,
    width: '100%'
  },
  circularProgressContainer: {
    alignContent: 'center',
    background: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: theme.spacing(10),
    width: '100%',
    zIndex: 999999
  }
})
