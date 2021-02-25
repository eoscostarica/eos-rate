export default (theme) => ({
  spacingContainers: {
    padding: theme.spacing(8, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(8, 0)
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
  coverTitle: {
    fontSize: theme.typography.h4.fontSize,
    marginBottom: 12.5
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
    marginBottom: theme.spacing(1)
  },
  leftCoverBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  ratingContainer: {
    maxWidth: '1024px'
  },
  ratingTitle: {
    fontSize: theme.typography.h4.fontSize,
    display: 'flex',
    marginBottom: 12.5
  },
  paragraph: {
    marginLeft: theme.spacing(4.5)
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
  title: {
    fontSize: theme.typography.h4.fontSize,
    color: theme.palette.grey[600],
    marginBottom: 12.5
  },
  ratingParagraph: {
    color: theme.palette.grey[600]
  },
  topicSubtitle: {
    marginBottom: theme.spacing(1),
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
