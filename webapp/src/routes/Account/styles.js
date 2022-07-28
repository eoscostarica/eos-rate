export default theme => ({
  container: {
    padding: theme.spacing(3, 2),
    color: theme.palette.common.white
  },
  account: {
    padding: theme.spacing(2)
  },
  title: {
    marginBottom: '12.5px !important',
    fontWeight: 'normal',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '1.17',
    letterSpacing: 'normal',
    textAlign: 'left',
    color: theme.palette.primary.dark,
    [theme.breakpoints.down('sm')]: {
      fontSize: '2.03rem !important',
      marginBottom: 0
    }
  },
  box: {
    height: 'calc(100% - 55px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  bold: {
    marginBottom: `${theme.spacing(1)} !important`,
    fontWeight: 'bold',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '23px !important',
    letterSpacing: '0.15px !important',
    textAlign: 'left',
    color: theme.palette.primary.dark,
    fontSize: '18px !important'
  },
  button: {
    marginTop: `${theme.spacing(3)} !important`
  },
  rateList: {
    marginTop: theme.spacing(3),
    '& hr': {
      width: '100%'
    }
  },
  avatar: {
    backgroundColor: theme.palette.surface.main
  },
  divLink: {
    marginTop: 20
  },
  link: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    display: 'block',
    width: '100%',
    color: '#1a73e8'
  },
  accordionTitle: {
    marginLeft: `${theme.spacing(1)} !important`
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(1),
    width: '80%'
  },
  remove: {
    display: 'flex',
    justifyContent: 'flex-end',
    '& svg': {
      fontSize: 16,
      color: '#CD4729'
    },
    '& p': {
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '16px',
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      letterSpacing: '1px',
      textTransform: 'uppercase',
      color: '#CD4729'
    }
  },
  yourRate: {
    fontStyle: 'normal',
    fontWeight: '500 !important',
    lineHeight: '24px',
    color: theme.palette.common.black,
    marginBottom: `${theme.spacing(1)} !important`
  },
  boxWrapper: {
    alignItems: 'center',
    display: 'flex'
  },
  alert: { width: '100%' },
  snackbarCenter: {
    width: '100%',
    justifyContent: 'center !important'
  }
})
