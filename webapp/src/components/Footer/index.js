import React, { memo } from 'react'
import Grid from '@mui/material/Grid'
import List from '@mui/material/List'
import ListItemText from '@mui/material/ListItemText'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'

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
