import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

import styles from './styles'

const useStyles = makeStyles(styles)

const CompareToolToggle = () => {
  const { t } = useTranslation('translations')
  const classes = useStyles()
  // const dispatch = useDispatch()
  // const { compareTool, selected } = useSelector(state => state.blockProducers)
  const compareTool = false
  const selected = []

  const handleToggleCompareTool = () => {
    // dispatch.blockProducers.toggleCompareTool()
  }

  return (
    <List className={classes.nested}>
      <ListItem
        className={classes.listItem}
        button
        onClick={() => handleToggleCompareTool()}
      >
        <ListItemText primary={`${t('voteToolToggle')}(${selected.length})`} />
        <ListItemSecondaryAction>
          {compareTool ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  )
}

export default CompareToolToggle
