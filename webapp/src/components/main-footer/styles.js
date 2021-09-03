export default (theme) => ({
  root: {
    position: 'static',
    bottom: 0,
    top: 'auto'
  },
  grow: {
    flexGrow: 1
  },
  eoscostaricaLogo: {
    height: 36,
    width: 'auto'
  },
  link: {
    color: theme.palette.common.white,
    textDecoration: 'none'
  },
  legend: {
    display: 'flex',
    width: 150,
    lineHeight: 1.33,
    fontSize: 8,
    fontWeight: 500,
    fontStretch: 'normal',
    letterSpacing: 1,
    textAlign: 'right',
    color: 'rgba(255, 255, 255, 0.6)',
    paddingRight: theme.spacing(2)
  }
})
