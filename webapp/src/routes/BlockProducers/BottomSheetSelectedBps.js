import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@mui/material/Drawer'
import { makeStyles } from '@mui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const SelectedBpsBottomSheet = ({ open, children, classesStyle }) => {
  const classes = useStyles()

  return (
    <Drawer
      className={classesStyle}
      classes={{
        paperAnchorLeft: classes.paperAnchor
      }}
      open={open}
    >
      {children}
    </Drawer>
  )
}

SelectedBpsBottomSheet.propTypes = {
  open: PropTypes.bool,
  classesStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  children: PropTypes.node
}

export default SelectedBpsBottomSheet
