export default theme => ({
  brand: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3),
    '& img': {
      width: 'auto',
      height: '125px'
    },
    '& img:hover': {
      cursor: 'pointer'
    }
  },
  scrollbar: {
    backgroundColor: theme.palette.background.paper
  },
  badge: {
    fontWeight: theme.typography.fontWeightBold,
    height: '20px',
    backgroundColor: theme.palette.primary.main,
    '& span.MuiChip-label, & span.MuiChip-label:hover': {
      cursor: 'pointer',
      color: theme.palette.primary.contrastText,
      padding: theme.spacing(0, 1)
    }
  },
  listItem: {
    display: 'flex',
    flexDirection: 'column',
    '& p': {
      fonWeight: theme.typography.fontWeightBold,
      paddingLeft: theme.spacing(2),
      cursor: 'default'
    },
    '& .MuiBox-root': {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    '& .MuiCollapse-container': {
      width: '100%',
      paddingLeft: theme.spacing(2)
    },
    '& .MuiListItemText-root .MuiTypography-root': {
      fontSize: theme.typography.subtitle2.fontSize
    },
    '& .active': {
      backgroundColor: theme.palette.action.selected
    }
  }
})
