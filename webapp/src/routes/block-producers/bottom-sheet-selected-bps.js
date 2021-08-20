import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'

import styles from './styles'

const useStyles = makeStyles(styles)

const SelectedBpsBottomSheet = ({ open, setOpen, children }) => {
  const classesStyle = useStyles()

  return (
    <Drawer
      classes={{
        paperAnchorLeft: classesStyle.paperAnchor
      }}
      open={open}
    >
      <Grid container style={{ backgroundColor: '#ccffcc' }} spacing={2}>
        <Grid item xs={10} />
        <Grid item md={12} xs={2} style={{ textAlign: 'end' }}>
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Grid>
      </Grid>
      {children}
    </Drawer>
  )
}

SelectedBpsBottomSheet.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  children: PropTypes.node
}

export default SelectedBpsBottomSheet
