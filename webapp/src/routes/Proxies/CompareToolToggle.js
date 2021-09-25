import React from 'react'
import { makeStyles } from '@mui/styles'
import { useTranslation } from 'react-i18next'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'

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
