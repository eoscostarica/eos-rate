export default theme => ({
  spacingContainers: {
    padding: theme.spacing(8, 2),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(6, 2)
    }
  },
  mainCoverContainer: {
    backgroundColor: theme.palette.surface.main
  },
  mainSubTopicContainer: {
    backgroundColor: theme.palette.surface.main
  },
  rateCategoryContainer: {
    backgroundColor: '#f5f5f5'
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
  ctaContainer: {
    textAlign: 'center'
  },
  chartContainer: {
    maxWidth: '400px',
    width: '100%',
    display: 'flex',
    alignItems: 'center'
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
    maxWidth: '1024px'
  },
  ratingParagraph: {
    color: theme.palette.grey[600]
  },
  gridContent: {
    padding: '2%'
  },
  link: {
    color: theme.palette.grey[600],
    fontWeight: '500',
    textDecoration: 'none'
  }
})
