import React, { memo } from 'react'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/styles'

import styles from './styles'

const useStyles = makeStyles(styles)

const Footer = () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Grid container item xs={12}>
        <List>
          <ListItem className={classes.listItem}>
            <ListItemText
              primary={
                <a href={''} target='_blank' rel='noopener noreferrer'>
                  link
                </a>
              }
            />
          </ListItem>
        </List>
      </Grid>
    </Box>
  )
}

export default memo(Footer)
