export default theme => ({
  spacingContainers: {
    padding: theme.spacing(8, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(6, 2)
    }
  },
  mainCoverContainer: {
    backgroundColor: theme.palette.surface.main,
    display: 'flex',
    justifyContent: 'center'
  },
  mainSubTopicContainer: {
    backgroundColor: theme.palette.surface.main,
    display: 'flex',
    justifyContent: 'center'
  },
  rateCategoryContainer: {
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center'
  },
  coverContainer: {
    padding: 0,
    color: '#433F5B',
    maxWidth: '1024px',
    backgroundColor: theme.palette.surface.main
  },
  mainTitle: {
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
  btnWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  btnMobile: {
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 336
    }
  },
  ctaContainer: {
    textAlign: 'center',
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'center'
    }
  },
  chartContainer: {
    width: '100%',
    display: 'none',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      width: '45%',
      '& .highcharts-container ': {
        height: '500px !important',
        width: '100% !important',
        '& > svg': {
          height: '500px !important',
          width: '100% !important'
        }
      }
    }
  },
  chartContainerMobile: {
    width: '100%',
    '& .highcharts-container ': {
      height: '400px !important',
      width: '100% !important',
      '& > svg': {
        height: '400px !important',
        width: '100% !important'
      }
    }
  },
  subtitle: {
    marginBottom: `${theme.spacing(1)} !important`,
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '23px !important',
    letterSpacing: '0.15px !important',
    textAlign: 'left',
    color: theme.palette.primary.dark,
    fontSize: 20
  },
  leftCoverBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& .MuiTypography-body2': {
      lineHeight: '28px',
      letterSpacing: '0.44px',
      fontSize: 16,
      color: theme.palette.common.black
    },
    [theme.breakpoints.up('md')]: {
      width: '55%'
    }
  },
  ratingContainer: {
    maxWidth: '1024px'
  },
  ratingTitle: {
    fontWeight: '500',
    fontStretch: 'normal',
    fontStyle: 'normal',
    lineHeight: '23px !important',
    letterSpacing: '0.15px !important',
    textAlign: 'left',
    color: theme.palette.primary.dark,
    fontSize: 20,
    display: 'flex',
    marginBottom: 12.5
  },
  paragraph: {
    marginLeft: `${theme.spacing(4.5)} !important`,
    lineHeight: '28px !important',
    letterSpacing: '0.44px !important',
    color: theme.palette.common.black
  },
  subTitleContainer: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 6
  },
  iconStyle: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    color: '#433F5B'
  },
  subTopicContainer: {
    maxWidth: '1024px',
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    }
  },
  ratingParagraph: {
    color: theme.palette.grey[600]
  },
  gridContent: {
    padding: '2%',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  },
  videoBox: {
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50%'
    }
  },
  link: {
    color: theme.palette.grey[600],
    fontWeight: '500',
    textDecoration: 'none'
  },
  mobileView: {
    display: 'flex',
    flexDirection: 'column',
    margin: '-10px 0 25px 0',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  desktopView: {
    display: 'flex'
  }
})
