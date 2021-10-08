export default theme => ({
  filterBanner: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(1, 2, 0, 2),
    alignItems: 'center',
    fontSize: '1rem !important'
  },
  pageTitle: {
    textTransform: 'uppercase',
    fontWeight: '500 !important',
    lineHeight: 'normal',
    letterSpacing: '0.08px'
  },
  visibilityHidden: {
    visibility: 'hidden !important'
  }
})
