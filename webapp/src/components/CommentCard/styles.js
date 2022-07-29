export default theme => ({
  sectionContent: {
    borderTop: 'solid 1px rgba(0, 0, 0, 0.38)'
  },
  cardContainer: {
    width: '95%'
  },
  container: {
    display: 'flex !important',
    justifyContent: 'end !important',
    alignItems: 'center !important'
  },
  commentContainer: {
    paddingLeft: 20
  },
  divComment: {
    paddingTop: '12px',
    paddingBottom: '12px'
  },
  divUser: {
    display: 'flex'
  },
  divLikes: {
    paddingTop: '20px'
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    margin: 'auto !important',
    [theme.breakpoints.down('sm')]: {
      margin: '0 !important'
    }
  },
  likeNum: {
    color: '#28B446'
  },
  dislikeNum: {
    color: '#D32F2F'
  },
  thumb: {
    fontSize: '16px !important',
    color: theme.palette.grey[400]
  },
  btnFilter: {
    color: 'inherit !important',
    borderRadius: '2px !important',
    content: ''
  },
  center: {
    margin: 'auto !important',
    [theme.breakpoints.down('sm')]: {
      margin: '0 !important'
    }
  },
  snackbarCenter: {
    width: '100%',
    justifyContent: 'center !important'
  },
  snackbarMessage: {
    color: theme.palette.common.white,
    fontWeight: '500 !important',
    fontSize: '14px !important',
    marginRight: `${theme.spacing(1)} !important`
  },
  messageBtn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'baseline'
  },
  linkText: {
    color: `${theme.palette.common.white} !important`,
    textDecoration: 'none !important',
    paddingTop: 2
  },
  snackbar: {
    width: '100%',
    justifyContent: 'center !important',
    '& .MuiSnackbarContent-root': {
      padding: 0
    },
    '& .MuiSnackbarContent-action': {
      padding: 0
    },
    '& .MuiAlert-icon': {
      alignItems: 'center'
    },
    '& .MuiAlert-message': {
      display: 'flex',
      alignItems: 'center'
    }
  }
})
