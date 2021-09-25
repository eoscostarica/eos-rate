import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@mui/material/Drawer'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close'

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
      <Grid container spacing={2}>
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
