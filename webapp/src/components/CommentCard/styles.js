export default theme => ({
  sectionContent: {
    borderTop: 'solid 1px rgba(0, 0, 0, 0.38)'
  },
  cardContainer: {
    width: '95%'
  },
  box: {
    display: 'flex',
    flex: 1,
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: theme.spacing(1)
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
    borderRadius: '2px !important'
  }
})
